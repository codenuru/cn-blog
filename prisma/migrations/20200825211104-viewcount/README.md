# Migration `20200825211104-viewcount`

This migration has been generated by enes esen at 8/26/2020, 12:11:04 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Post" ADD COLUMN "viewCount" integer  NOT NULL DEFAULT 0;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200824205506-addedcomment..20200825211104-viewcount
--- datamodel.dml
+++ datamodel.dml
@@ -3,9 +3,9 @@
 }
 datasource postgresql {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 model User {
@@ -27,8 +27,9 @@
   published Boolean @default(false)
   title     String
   author    User?   @relation(fields: [authorId], references: [id])
   authorId  Int?
+  viewCount Int      @default(0)
   comments  Comment[]
   createdAt DateTime  @default(now())
   updatedAt DateTime  @updatedAt
 }
```


