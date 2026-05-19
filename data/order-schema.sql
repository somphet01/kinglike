create table orders (
  id uuid primary key,
  order_code text unique not null,
  customer_name text not null,
  customer_phone text not null,
  customer_whatsapp text,
  customer_address text not null,
  note text,
  total_amount numeric not null,
  status text default 'checking',
  payment_method text default 'qr_transfer',
  slip_url text,
  admin_note text,
  created_at timestamp default now(),
  updated_at timestamp default now()
);

create table order_items (
  id uuid primary key,
  order_id uuid references orders(id) on delete cascade,
  product_id text,
  product_name text not null,
  size text,
  quantity int not null default 1,
  unit_price numeric not null,
  subtotal numeric not null
);

create table order_status_logs (
  id uuid primary key,
  order_id uuid references orders(id) on delete cascade,
  old_status text,
  new_status text not null,
  changed_by text,
  note text,
  created_at timestamp default now()
);
