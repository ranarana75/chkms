// Local Database utilities for dynamic data management
import {
  Student,
  Teacher,
  Notice,
  Event,
  LibraryIssue,
  HostelResident,
  TransportUser,
  AdmissionApplication,
  ExamResult,
} from "./database";

// Local Storage Keys
export const STORAGE_KEYS = {
  STUDENTS: "chkms_students",
  TEACHERS: "chkms_teachers",
  NOTICES: "chkms_notices",
  EVENTS: "chkms_events",
  LIBRARY_ISSUES: "chkms_library_issues",
  HOSTEL_RESIDENTS: "chkms_hostel_residents",
  TRANSPORT_USERS: "chkms_transport_users",
  ADMISSION_APPLICATIONS: "chkms_admission_applications",
  EXAM_RESULTS: "chkms_exam_results",
  FINANCIAL_TRANSACTIONS: "chkms_financial_transactions",
  ATTENDANCE_RECORDS: "chkms_attendance_records",
  MARKS_RECORDS: "chkms_marks_records",
  ISLAMIC_PROGRESS: "chkms_islamic_progress",
  SYSTEM_STATS: "chkms_system_stats",
} as const;

// Generic Local Database Class
export class LocalDB<T> {
  private key: string;

  constructor(key: string) {
    this.key = key;
  }

  // Get all items
  getAll(): T[] {
    try {
      const data = localStorage.getItem(this.key);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error(`Error reading ${this.key}:`, error);
      return [];
    }
  }

  // Get item by ID
  getById(id: string): T | null {
    const items = this.getAll();
    return items.find((item: any) => item.id === id) || null;
  }

  // Add new item
  add(item: T): boolean {
    try {
      const items = this.getAll();
      items.push(item);
      localStorage.setItem(this.key, JSON.stringify(items));
      return true;
    } catch (error) {
      console.error(`Error adding to ${this.key}:`, error);
      return false;
    }
  }

  // Update item
  update(id: string, updatedItem: Partial<T>): boolean {
    try {
      const items = this.getAll();
      const index = items.findIndex((item: any) => item.id === id);
      if (index !== -1) {
        items[index] = { ...items[index], ...updatedItem };
        localStorage.setItem(this.key, JSON.stringify(items));
        return true;
      }
      return false;
    } catch (error) {
      console.error(`Error updating ${this.key}:`, error);
      return false;
    }
  }

  // Delete item
  delete(id: string): boolean {
    try {
      const items = this.getAll();
      const filteredItems = items.filter((item: any) => item.id !== id);
      localStorage.setItem(this.key, JSON.stringify(filteredItems));
      return true;
    } catch (error) {
      console.error(`Error deleting from ${this.key}:`, error);
      return false;
    }
  }

  // Search items
  search(predicate: (item: T) => boolean): T[] {
    return this.getAll().filter(predicate);
  }

  // Clear all data
  clear(): boolean {
    try {
      localStorage.removeItem(this.key);
      return true;
    } catch (error) {
      console.error(`Error clearing ${this.key}:`, error);
      return false;
    }
  }

  // Get count
  count(): number {
    return this.getAll().length;
  }
}

// Database instances
export const studentsDB = new LocalDB<Student>(STORAGE_KEYS.STUDENTS);
export const teachersDB = new LocalDB<Teacher>(STORAGE_KEYS.TEACHERS);
export const noticesDB = new LocalDB<Notice>(STORAGE_KEYS.NOTICES);
export const eventsDB = new LocalDB<Event>(STORAGE_KEYS.EVENTS);
export const libraryIssuesDB = new LocalDB<LibraryIssue>(
  STORAGE_KEYS.LIBRARY_ISSUES,
);
export const hostelResidentsDB = new LocalDB<HostelResident>(
  STORAGE_KEYS.HOSTEL_RESIDENTS,
);
export const transportUsersDB = new LocalDB<TransportUser>(
  STORAGE_KEYS.TRANSPORT_USERS,
);
export const admissionApplicationsDB = new LocalDB<AdmissionApplication>(
  STORAGE_KEYS.ADMISSION_APPLICATIONS,
);
export const examResultsDB = new LocalDB<ExamResult>(STORAGE_KEYS.EXAM_RESULTS);

// Reactive data hooks
export function useLocalDB<T>(db: LocalDB<T>) {
  const [data, setData] = React.useState<T[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const loadData = () => {
      setLoading(true);
      const items = db.getAll();
      setData(items);
      setLoading(false);
    };

    loadData();

    // Listen for storage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === db["key"]) {
        loadData();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [db]);

  const add = React.useCallback(
    (item: T) => {
      const success = db.add(item);
      if (success) {
        setData((prev) => [...prev, item]);
      }
      return success;
    },
    [db],
  );

  const update = React.useCallback(
    (id: string, updatedItem: Partial<T>) => {
      const success = db.update(id, updatedItem);
      if (success) {
        setData((prev) =>
          prev.map((item: any) =>
            item.id === id ? { ...item, ...updatedItem } : item,
          ),
        );
      }
      return success;
    },
    [db],
  );

  const remove = React.useCallback(
    (id: string) => {
      const success = db.delete(id);
      if (success) {
        setData((prev) => prev.filter((item: any) => item.id !== id));
      }
      return success;
    },
    [db],
  );

  return { data, loading, add, update, remove };
}

// Initialize with sample data
export function initializeSampleData() {
  // Check if data already exists
  if (studentsDB.count() > 0) return;

  // Sample student data with additional fields for display
  const sampleStudents: any[] = [
    {
      id: "1",
      userId: "user1",
      studentId: "STD001",
      name: "মোহাম্মদ আবদুল্লাহ",
      admissionDate: new Date("2023-01-15"),
      class: "আলিম প্রথম বর্ষ",
      section: "ক",
      roll: "০৫",
      fatherName: "মোহাম্মদ আব্দুল করিম",
      motherName: "ফাতেমা খাতুন",
      dateOfBirth: new Date("2005-03-10"),
      bloodGroup: "B+",
      emergencyContact: "+8801712345678",
      photo: "/placeholder.svg",
      isActive: true,
    },
    {
      id: "2",
      userId: "user2",
      studentId: "STD002",
      name: "আহমদ হাসান",
      admissionDate: new Date("2023-01-15"),
      class: "আলিম দ্বিতীয় বর্ষ",
      section: "খ",
      roll: "১২",
      fatherName: "আহমদ আলী",
      motherName: "আয়েশা বেগম",
      dateOfBirth: new Date("2004-07-22"),
      bloodGroup: "A+",
      emergencyContact: "+8801987654321",
      photo: "/placeholder.svg",
      isActive: true,
    },
  ];

  // Sample teachers with additional fields
  const sampleTeachers: any[] = [
    {
      id: "1",
      userId: "teacher1",
      teacherId: "TCH001",
      name: "উস্তাদ আবদুর রহমান",
      joiningDate: new Date("2020-01-15"),
      subjects: ["আরবি সাহিত্য", "তাফসীর"],
      qualification: "মাস্টার্স ইন ইসলামিক স্টাডিজ",
      experience: 8,
      salary: 35000,
      photo: "/placeholder.svg",
      isActive: true,
    },
  ];

  // Initialize data
  sampleStudents.forEach((student) => studentsDB.add(student));
  sampleTeachers.forEach((teacher) => teachersDB.add(teacher));
}

// React import (for TypeScript)
import React from "react";
