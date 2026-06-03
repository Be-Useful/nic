"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

declare global {
  var __demoBooks: any[] | undefined;
}

if (!globalThis.__demoBooks) {
  globalThis.__demoBooks = [
    {
      id: "demo-1",
      title: 'The History of Mithila',
      author: 'Upendra Thakur',
      isbn: '978-0000000001',
      description: 'A comprehensive history of the Mithila region.',
      category: 'History',
      totalCount: 5,
      shelfLocation: 'A01-S01',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "demo-2",
      title: 'Madhubani Art',
      author: 'Anand Krishna',
      isbn: '978-0000000002',
      description: 'Exploring the intricate patterns and cultural significance of Madhubani paintings.',
      category: 'Art & Culture',
      totalCount: 3,
      shelfLocation: 'A01-S02',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "demo-3",
      title: 'Ramayana in Mithila Tradition',
      author: 'Dr. Ram Dayal Rakesh',
      isbn: '978-0000000003',
      description: 'An exploration of the cultural and historical significance of the Ramayana in the Mithila region.',
      category: 'Culture & Religion',
      totalCount: 10,
      shelfLocation: 'A02-S01',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "demo-4",
      title: 'Bihar General Knowledge',
      author: 'Dr. Manish Rannjan',
      isbn: '978-0000000004',
      description: 'Important general knowledge regarding Bihar state.',
      category: 'Reference',
      totalCount: 15,
      shelfLocation: 'A03-S04',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ];
}

export async function getBooks(query: string = "") {
  const books = globalThis.__demoBooks || [];
  if (!query) {
    return [...books].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  const lowerQuery = query.toLowerCase();
  return books.filter(book => 
    book.title.toLowerCase().includes(lowerQuery) ||
    book.author.toLowerCase().includes(lowerQuery) ||
    book.category.toLowerCase().includes(lowerQuery)
  ).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

export async function getBookById(id: string) {
  const books = globalThis.__demoBooks || [];
  return books.find(b => b.id === id) || null;
}

export async function addBook(formData: FormData) {
  const title = formData.get("title") as string;
  const author = formData.get("author") as string;
  const isbn = formData.get("isbn") as string;
  const description = formData.get("description") as string;
  const category = formData.get("category") as string;
  const shelfLocation = formData.get("shelfLocation") as string;
  const totalCount = parseInt(formData.get("totalCount") as string, 10) || 1;

  const newBook = {
    id: `demo-${Date.now()}`,
    title, author, isbn, description, category, shelfLocation, totalCount,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  if (globalThis.__demoBooks) {
    globalThis.__demoBooks.push(newBook);
  }

  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function updateBook(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const author = formData.get("author") as string;
  const isbn = formData.get("isbn") as string;
  const description = formData.get("description") as string;
  const category = formData.get("category") as string;
  const shelfLocation = formData.get("shelfLocation") as string;
  const totalCount = parseInt(formData.get("totalCount") as string, 10) || 0;

  if (globalThis.__demoBooks) {
    const bookIndex = globalThis.__demoBooks.findIndex(b => b.id === id);
    if (bookIndex !== -1) {
      globalThis.__demoBooks[bookIndex] = {
        ...globalThis.__demoBooks[bookIndex],
        title, author, isbn, description, category, shelfLocation, totalCount,
        updatedAt: new Date(),
      };
    }
  }

  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath(`/book/${id}`);
  redirect("/admin");
}

export async function deleteBook(id: string) {
  if (globalThis.__demoBooks) {
    globalThis.__demoBooks = globalThis.__demoBooks.filter(b => b.id !== id);
  }

  revalidatePath("/");
  revalidatePath("/admin");
}

export async function loginAdmin(formData: FormData) {
  const adminId = formData.get("adminId") as string;
  const password = formData.get("password") as string;

  if (adminId === "admin" && password === "mithila123") {
    const cookieStore = await cookies();
    cookieStore.set("admin_session", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
    redirect("/admin");
  } else {
    redirect("/admin/login?error=1");
  }
}
