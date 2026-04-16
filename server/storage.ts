import { contactMessages, events, type InsertContactMessage, type ContactMessage, type Event, type InsertEvent } from "@shared/schema";
import { db } from "./db";

export interface IStorage {
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getEvents(): Promise<Event[]>;
  createEvent(event: InsertEvent): Promise<Event>;
  updateEvent(id: number, event: Partial<InsertEvent>): Promise<Event>;
  deleteEvent(id: number): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    if (!db) throw new Error("Database not initialized");
    const [result] = await db.insert(contactMessages).values(message).returning();
    return result;
  }

  async getEvents(): Promise<Event[]> {
    if (!db) throw new Error("Database not initialized");
    return await db.select().from(events).orderBy(events.createdAt);
  }

  async createEvent(event: InsertEvent): Promise<Event> {
    if (!db) throw new Error("Database not initialized");
    const [result] = await db.insert(events).values(event).returning();
    return result;
  }

  async updateEvent(id: number, event: Partial<InsertEvent>): Promise<Event> {
    if (!db) throw new Error("Database not initialized");
    const { eq } = await import("drizzle-orm");
    const [result] = await db.update(events).set(event).where(eq(events.id, id)).returning();
    return result;
  }

  async deleteEvent(id: number): Promise<void> {
    if (!db) throw new Error("Database not initialized");
    const { eq } = await import("drizzle-orm");
    await db.delete(events).where(eq(events.id, id));
  }
}

export class MemStorage implements IStorage {
  private messages: ContactMessage[] = [];
  private messageId = 1;

  private eventsList: Event[] = [];
  private eventId = 1;

  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const newMessage: ContactMessage = {
      ...message,
      id: this.messageId++,
      createdAt: new Date(),
    };
    this.messages.push(newMessage);
    return newMessage;
  }

  async getEvents(): Promise<Event[]> {
    return [...this.eventsList];
  }

  async createEvent(event: InsertEvent): Promise<Event> {
    const newEvent: Event = {
      ...event,
      flyerUrl: event.flyerUrl ?? null,
      id: this.eventId++,
      createdAt: new Date(),
    };
    this.eventsList.push(newEvent);
    return newEvent;
  }

  async updateEvent(id: number, event: Partial<InsertEvent>): Promise<Event> {
    const idx = this.eventsList.findIndex(e => e.id === id);
    if (idx === -1) throw new Error("Event not found");
    this.eventsList[idx] = { ...this.eventsList[idx], ...event };
    return this.eventsList[idx];
  }

  async deleteEvent(id: number): Promise<void> {
    this.eventsList = this.eventsList.filter(e => e.id !== id);
  }
}

export const storage = process.env.DATABASE_URL ? new DatabaseStorage() : new MemStorage();
