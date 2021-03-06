# Migration `20200818183643-initial`

This migration has been generated by enes esen at 8/18/2020, 9:36:43 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TYPE "Role" AS ENUM ('SUPER_USER', 'USER', 'COMPANY_ADMIN', 'COMPANY_USER');

CREATE TABLE "public"."Company" (
"id" SERIAL,
"name" text  NOT NULL ,
PRIMARY KEY ("id"))

CREATE TABLE "public"."User" (
"id" SERIAL,
"name" text  NOT NULL ,
"surname" text  NOT NULL ,
"email" text  NOT NULL ,
"password" text  NOT NULL ,
"role" "Role" NOT NULL DEFAULT E'USER',
"isOwner" boolean  NOT NULL DEFAULT false,
"isDeleted" boolean  NOT NULL DEFAULT false,
"companyId" integer  NOT NULL ,
PRIMARY KEY ("id"))

CREATE UNIQUE INDEX "User.email_unique" ON "public"."User"("email")

ALTER TABLE "public"."User" ADD FOREIGN KEY ("companyId")REFERENCES "public"."Company"("id") ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200818183643-initial
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,34 @@
+generator client {
+  provider = "prisma-client-js"
+}
+
+datasource postgresql {
+  provider = "postgresql"
+  url = "***"
+}
+
+model Company {
+  id      Int    @default(autoincrement()) @id
+  name    String
+  members User[] @relation(name: "CompanyToUsers")
+}
+
+model User {
+  id        Int     @default(autoincrement()) @id
+  name      String
+  surname   String
+  email     String  @unique
+  password  String
+  role      Role    @default(value: USER)
+  isOwner   Boolean @default(false)
+  isDeleted Boolean @default(false)
+  company   Company @relation(name: "CompanyToUsers", fields: [companyId], references: [id])
+  companyId Int
+}
+
+enum Role {
+  SUPER_USER
+  USER
+  COMPANY_ADMIN
+  COMPANY_USER
+}
```


