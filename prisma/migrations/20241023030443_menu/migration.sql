-- CreateTable
CREATE TABLE "asset_google_maps" (
    "id" SERIAL NOT NULL,
    "id_unit" SMALLINT,
    "email_account_bisnis" VARCHAR(32),
    "unit_bisnis" VARCHAR(50),
    "url_google_maps" VARCHAR(255),
    "no_telp_publish" VARCHAR(255),
    "link_wa" VARCHAR(255),
    "status" VARCHAR(255),
    "created_at" TIMESTAMP(6),
    "updated_at" TIMESTAMP(6),

    CONSTRAINT "asset_google_maps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "asset_medsos" (
    "id" SERIAL NOT NULL,
    "id_unit" INTEGER,
    "id_sekretariat" INTEGER,
    "no_telepon" VARCHAR(25),
    "nama_akun" VARCHAR(25),
    "username" VARCHAR(25),
    "password" VARCHAR(25),
    "url_akun" VARCHAR(25),
    "email_akun" VARCHAR(25),
    "status" VARCHAR(25),
    "notes" VARCHAR(255),
    "created_at" TIMESTAMP(6),
    "updated_at" TIMESTAMP(6),

    CONSTRAINT "asset_medsos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "asset_telepon" (
    "id" SERIAL NOT NULL,
    "id_unit" SMALLINT,
    "no_telepon" VARCHAR(32),
    "provider" VARCHAR(50),
    "tanggal_aktif" DATE,
    "tanggal_non_aktif" DATE,
    "penanggung_jawab" VARCHAR(255),
    "is_published" VARCHAR(255),
    "created_at" TIMESTAMP(6),
    "updated_at" TIMESTAMP(6),
    "id_sekretariat" VARCHAR(255),

    CONSTRAINT "asset_telepon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "master_kota_go" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255),
    "created_at" TIMESTAMP(6),
    "updated_at" TIMESTAMP(6),
    "id_cabang" SMALLINT,

    CONSTRAINT "master_kota_go_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "master_platform" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255),
    "created_at" TIMESTAMP(6),
    "updated_at" TIMESTAMP(6),

    CONSTRAINT "master_platform_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "master_unit_pj" (
    "id" SERIAL NOT NULL,
    "id_unit" SMALLINT,
    "pj_pusat" SMALLINT,
    "id_cabang" SMALLINT,
    "cabang" VARCHAR(255),
    "id_kota" SMALLINT,
    "kota" VARCHAR(255),
    "unit" VARCHAR(255),
    "nama_gedung" VARCHAR(255),
    "is_sekretariat" VARCHAR(255),
    "id_pj_cabang" VARCHAR(255),
    "nama_pj_cabang" VARCHAR(255),
    "updated_at" TIMESTAMP(6),
    "created_at" TIMESTAMP(6),
    "alamat" VARCHAR(255),

    CONSTRAINT "master_unit_pj_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "produktivitas_digital" (
    "id" SERIAL NOT NULL,
    "id_kota" SMALLINT,
    "id_unit" SMALLINT,
    "id_platform" SMALLINT,
    "link_produktivitas" VARCHAR(255),
    "id_user_input" VARCHAR(255),
    "tanggal_input" DATE,
    "is_approved" BOOLEAN,
    "id_user_verify" SMALLINT,
    "tanggal_verify" TIMESTAMP(6),
    "created_at" TIMESTAMP(6),
    "updated_at" TIMESTAMP(6),

    CONSTRAINT "produktivitas_digital_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "master_pj_cabang" (
    "id" INTEGER NOT NULL,
    "nama" VARCHAR(255),
    "email" VARCHAR(255),
    "telp" VARCHAR(255),

    CONSTRAINT "master_pj_cabang_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "master_pj_pusat" (
    "id" INTEGER NOT NULL,
    "nama" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255),
    "telp" VARCHAR(255) NOT NULL,

    CONSTRAINT "master_pj_pusat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "nama" VARCHAR(255) NOT NULL,
    "nik" VARCHAR(255) NOT NULL,
    "no_tlp" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'pj_cabang',
    "id_pj_cabang" VARCHAR(255),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menu_groups" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "slug" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "menu_groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menu_items" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "href" TEXT,
    "icon" TEXT,
    "label" TEXT NOT NULL,
    "parent_id" TEXT,
    "group_id" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "menu_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_nik_key" ON "users"("nik");

-- CreateIndex
CREATE UNIQUE INDEX "menu_groups_name_key" ON "menu_groups"("name");

-- CreateIndex
CREATE UNIQUE INDEX "menu_groups_slug_key" ON "menu_groups"("slug");

-- AddForeignKey
ALTER TABLE "menu_items" ADD CONSTRAINT "menu_items_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "menu_items"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menu_items" ADD CONSTRAINT "menu_items_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "menu_groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;
