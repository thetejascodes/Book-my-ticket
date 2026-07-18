import { pgTable, serial, varchar, boolean, timestamp, pgEnum,uuid,text,integer } from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role", ["user", "admin"]);

export const users = pgTable("users", {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  role: roleEnum("role").notNull().default("user"),
  isVerified: boolean("is_verified").notNull().default(false),
  verificationToken: varchar("verification_token", { length: 255 }),
  resetPasswordToken: varchar("reset_password_token", { length: 255 }),
  refreshToken: varchar("refresh_token", { length: 500 }),
  resetPasswordExpire: timestamp("reset_password_expire"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const seats = pgTable("seats",{
  id:uuid('id').primaryKey().defaultRandom(),
  isBook:boolean("is_booked").notNull().default(false),
  userId:uuid("user_id").references(()=>users.id),
  seatNumber: integer("seat_number").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
})

