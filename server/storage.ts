import { contactMessages, type InsertContactMessage, type ContactMessage } from "@shared/schema";
import { db } from "./db";

export interface IStorage {
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
}

export class DatabaseStorage implements IStorage {
  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    if (!db) throw new Error("Database not initialized");
    const [result] = await db.insert(contactMessages).values(message).returning();
    return result;
  }
}

export class MemStorage implements IStorage {
  private messages: ContactMessage[] = [];
  private currentId = 1;

  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const newMessage: ContactMessage = {
      ...message,
      id: this.currentId++,
      createdAt: new Date(),
    };
    this.messages.push(newMessage);
    return newMessage;
  }
}

export const storage = process.env.DATABASE_URL ? new DatabaseStorage() : new MemStorage();
