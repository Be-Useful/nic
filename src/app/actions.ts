"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

declare global {
  var __demoBooks: any[] | undefined;
  var __demoVisitors: any[] | undefined;
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
      price: 450,
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
      price: 550,
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
      price: 350,
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
      price: 250,
      totalCount: 15,
      shelfLocation: 'A03-S04',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ];
}

if (!globalThis.__demoVisitors) {
  globalThis.__demoVisitors = [
    {
      id: "visitor-1",
      name: 'Dr. Rajesh Kumar',
      email: 'rajesh.kumar@example.com',
      phone: '9876543210',
      category: 'Researcher',
      institution: 'Mithila Research Center',
      purpose: 'Historical research',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "visitor-2",
      name: 'Priya Singh',
      email: 'priya.singh@example.com',
      phone: '9876543211',
      category: 'Student',
      institution: 'Delhi University',
      purpose: 'Academic research',
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
  const price = parseInt(formData.get("price") as string, 10) || 0;

  const newBook = {
    id: `demo-${Date.now()}`,
    title, author, isbn, description, category, shelfLocation, totalCount, price,
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
  const price = parseInt(formData.get("price") as string, 10) || 0;

  if (globalThis.__demoBooks) {
    const bookIndex = globalThis.__demoBooks.findIndex(b => b.id === id);
    if (bookIndex !== -1) {
      globalThis.__demoBooks[bookIndex] = {
        ...globalThis.__demoBooks[bookIndex],
        title, author, isbn, description, category, shelfLocation, totalCount, price,
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

// Visitor/Researcher Management
export async function getVisitors(query: string = "") {
  const visitors = globalThis.__demoVisitors || [];
  if (!query) {
    return [...visitors].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  const lowerQuery = query.toLowerCase();
  return visitors.filter(visitor =>
    visitor.name.toLowerCase().includes(lowerQuery) ||
    visitor.email.toLowerCase().includes(lowerQuery) ||
    visitor.category.toLowerCase().includes(lowerQuery)
  ).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

export async function getVisitorById(id: string) {
  const visitors = globalThis.__demoVisitors || [];
  return visitors.find(v => v.id === id) || null;
}

export async function addVisitor(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const category = formData.get("category") as string;
  const institution = formData.get("institution") as string;
  const purpose = formData.get("purpose") as string;

  const newVisitor = {
    id: `visitor-${Date.now()}`,
    name, email, phone, category, institution, purpose,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  if (globalThis.__demoVisitors) {
    globalThis.__demoVisitors.push(newVisitor);
  }

  revalidatePath("/admin/visitors");
  redirect("/admin/visitors");
}

export async function updateVisitor(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const category = formData.get("category") as string;
  const institution = formData.get("institution") as string;
  const purpose = formData.get("purpose") as string;

  if (globalThis.__demoVisitors) {
    const visitorIndex = globalThis.__demoVisitors.findIndex(v => v.id === id);
    if (visitorIndex !== -1) {
      globalThis.__demoVisitors[visitorIndex] = {
        ...globalThis.__demoVisitors[visitorIndex],
        name, email, phone, category, institution, purpose,
        updatedAt: new Date(),
      };
    }
  }

  revalidatePath("/admin/visitors");
  redirect("/admin/visitors");
}

export async function deleteVisitor(id: string) {
  if (globalThis.__demoVisitors) {
    globalThis.__demoVisitors = globalThis.__demoVisitors.filter(v => v.id !== id);
  }

  revalidatePath("/admin/visitors");
}

// Excel Export
export async function exportBooksToExcel() {
  const XLSX = require('xlsx');
  const books = globalThis.__demoBooks || [];

  const worksheetData = books.map(book => ({
    'Title': book.title,
    'Author': book.author,
    'ISBN': book.isbn,
    'Category': book.category,
    'Price': book.price,
    'Total Count': book.totalCount,
    'Shelf Location': book.shelfLocation,
    'Description': book.description,
  }));

  const worksheet = XLSX.utils.json_to_sheet(worksheetData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Books");

  // Set column widths
  worksheet['!cols'] = [
    { wch: 25 },
    { wch: 20 },
    { wch: 15 },
    { wch: 15 },
    { wch: 10 },
    { wch: 12 },
    { wch: 15 },
    { wch: 30 },
  ];

  const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  return buffer;
}

// Excel Import
export async function importBooksFromExcel(formData: FormData) {
  const XLSX = require('xlsx');
  const file = formData.get("file") as File;

  if (!file) {
    throw new Error("No file provided");
  }

  const arrayBuffer = await file.arrayBuffer();
  const workbook = XLSX.read(new Uint8Array(arrayBuffer), { type: 'array' });
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const jsonData = XLSX.utils.sheet_to_json(worksheet);

  const newBooks = jsonData.map((row: any) => ({
    id: `demo-${Date.now()}-${Math.random()}`,
    title: row['Title'] || '',
    author: row['Author'] || '',
    isbn: row['ISBN'] || '',
    category: row['Category'] || '',
    price: parseInt(row['Price']) || 0,
    totalCount: parseInt(row['Total Count']) || 1,
    shelfLocation: row['Shelf Location'] || '',
    description: row['Description'] || '',
    createdAt: new Date(),
    updatedAt: new Date(),
  }));

  if (globalThis.__demoBooks) {
    globalThis.__demoBooks.push(...newBooks);
  }

  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin");
}
