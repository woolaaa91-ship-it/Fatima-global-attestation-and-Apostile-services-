-- ============================================================================
-- FATIMA GLOBAL ATTESTATION — Apostille Tracking & Verification Module
-- Supabase / PostgreSQL Schema & Row-Level Security (RLS) Migration
-- ============================================================================
-- Security Architecture:
-- 1. Row-Level Security (RLS) is enabled on all tables.
-- 2. Anonymous / public browser clients have ZERO direct SELECT/INSERT/UPDATE/DELETE
--    privileges on `tracking_orders` or `tracking_audit_logs`.
-- 3. All public tracking lookups MUST go through the server-side API, which strips
--    `internal_order_id`, `customer_reference`, `customer_phone`, `internal_notes`,
--    and `verification_pin_hash`.
-- 4. Only authenticated administrators with role 'admin' or 'operations_staff'
--    (or the server-side service_role key) can create or modify orders.
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. Allowed Business Statuses Enum
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'fga_order_status') THEN
    CREATE TYPE fga_order_status AS ENUM (
      'Order Received',
      'Documents Under Review',
      'Processing',
      'Sent for Attestation',
      'Attestation Completed',
      'Ready for Dispatch',
      'Dispatched',
      'Completed',
      'Delivered',
      'On Hold — Contact Support'
    );
  END IF;
END$$;

-- 2. Secure Orders Table
CREATE TABLE IF NOT EXISTS public.tracking_orders (
  internal_order_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tracking_id TEXT NOT NULL UNIQUE CHECK (char_length(tracking_id) BETWEEN 8 AND 32),
  public_tracking_token TEXT NOT NULL UNIQUE CHECK (char_length(public_tracking_token) >= 32),
  customer_reference TEXT NOT NULL,
  customer_phone TEXT NULL,
  customer_whatsapp_consent BOOLEAN NOT NULL DEFAULT FALSE,
  whatsapp_delivery_status TEXT NULL,
  whatsapp_last_notified_at TIMESTAMPTZ NULL,
  verification_pin_hash TEXT NULL,
  requires_pin BOOLEAN NOT NULL DEFAULT FALSE,
  service_type TEXT NOT NULL,
  document_category TEXT NOT NULL,
  destination_country TEXT NULL,
  current_status fga_order_status NOT NULL DEFAULT 'Order Received',
  internal_notes TEXT NOT NULL DEFAULT '',
  public_timeline JSONB NOT NULL DEFAULT '[]'::jsonb,
  token_expires_at TIMESTAMPTZ NULL,
  is_archived BOOLEAN NOT NULL DEFAULT FALSE,
  created_by TEXT NOT NULL DEFAULT 'System Administrator',
  updated_by TEXT NOT NULL DEFAULT 'System Administrator',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_tracking_orders_tracking_id
  ON public.tracking_orders (upper(tracking_id));

CREATE INDEX IF NOT EXISTS idx_tracking_orders_public_token
  ON public.tracking_orders (public_tracking_token);

CREATE INDEX IF NOT EXISTS idx_tracking_orders_updated_at
  ON public.tracking_orders (updated_at DESC);

-- 3. Immutable Administrator Audit Log Table
CREATE TABLE IF NOT EXISTS public.tracking_audit_logs (
  audit_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  internal_order_id UUID NOT NULL REFERENCES public.tracking_orders(internal_order_id) ON DELETE CASCADE,
  tracking_id TEXT NOT NULL,
  actor_name TEXT NOT NULL,
  actor_role TEXT NOT NULL,
  action TEXT NOT NULL,
  previous_status TEXT NULL,
  new_status TEXT NULL,
  details TEXT NOT NULL DEFAULT '',
  ip_hash TEXT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_tracking_audit_logs_order_id
  ON public.tracking_audit_logs (internal_order_id, created_at DESC);

-- 4. Enable Row-Level Security (RLS)
ALTER TABLE public.tracking_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tracking_orders FORCE ROW LEVEL SECURITY;

ALTER TABLE public.tracking_audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tracking_audit_logs FORCE ROW LEVEL SECURITY;

-- 5. RLS Policies: Block all direct anonymous access; allow only authorized admin roles
DROP POLICY IF EXISTS "Admins can read all orders" ON public.tracking_orders;
CREATE POLICY "Admins can read all orders"
  ON public.tracking_orders
  FOR SELECT
  TO authenticated
  USING (
    (auth.jwt() -> 'app_metadata' ->> 'role') IN ('admin', 'operations_staff')
  );

DROP POLICY IF EXISTS "Admins can insert orders" ON public.tracking_orders;
CREATE POLICY "Admins can insert orders"
  ON public.tracking_orders
  FOR INSERT
  TO authenticated
  WITH CHECK (
    (auth.jwt() -> 'app_metadata' ->> 'role') IN ('admin', 'operations_staff')
  );

DROP POLICY IF EXISTS "Admins can update orders" ON public.tracking_orders;
CREATE POLICY "Admins can update orders"
  ON public.tracking_orders
  FOR UPDATE
  TO authenticated
  USING (
    (auth.jwt() -> 'app_metadata' ->> 'role') IN ('admin', 'operations_staff')
  )
  WITH CHECK (
    (auth.jwt() -> 'app_metadata' ->> 'role') IN ('admin', 'operations_staff')
  );

DROP POLICY IF EXISTS "Admins can read audit logs" ON public.tracking_audit_logs;
CREATE POLICY "Admins can read audit logs"
  ON public.tracking_audit_logs
  FOR SELECT
  TO authenticated
  USING (
    (auth.jwt() -> 'app_metadata' ->> 'role') IN ('admin', 'operations_staff')
  );

DROP POLICY IF EXISTS "Admins can insert audit logs" ON public.tracking_audit_logs;
CREATE POLICY "Admins can insert audit logs"
  ON public.tracking_audit_logs
  FOR INSERT
  TO authenticated
  WITH CHECK (
    (auth.jwt() -> 'app_metadata' ->> 'role') IN ('admin', 'operations_staff')
  );
