import { useState, useEffect, useCallback } from "react";
import { LocalDB } from "@shared/localDatabase";

// Generic hook for local database operations
export function useLocalData<T>(db: LocalDB<T>) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load data
  const loadData = useCallback(() => {
    try {
      setLoading(true);
      setError(null);
      const items = db.getAll();
      setData(items);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, [db]);

  // Initial load
  useEffect(() => {
    loadData();
  }, [loadData]);

  // Add item
  const addItem = useCallback(
    async (item: T) => {
      try {
        const success = db.add(item);
        if (success) {
          setData((prev) => [...prev, item]);
          return true;
        }
        return false;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to add item");
        return false;
      }
    },
    [db],
  );

  // Update item
  const updateItem = useCallback(
    async (id: string, updatedItem: Partial<T>) => {
      try {
        const success = db.update(id, updatedItem);
        if (success) {
          setData((prev) =>
            prev.map((item: any) =>
              item.id === id ? { ...item, ...updatedItem } : item,
            ),
          );
          return true;
        }
        return false;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to update item");
        return false;
      }
    },
    [db],
  );

  // Remove item
  const removeItem = useCallback(
    async (id: string) => {
      try {
        const success = db.delete(id);
        if (success) {
          setData((prev) => prev.filter((item: any) => item.id !== id));
          return true;
        }
        return false;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to remove item");
        return false;
      }
    },
    [db],
  );

  // Search items
  const searchItems = useCallback(
    (predicate: (item: T) => boolean) => {
      return data.filter(predicate);
    },
    [data],
  );

  // Get item by ID
  const getItem = useCallback(
    (id: string) => {
      return data.find((item: any) => item.id === id) || null;
    },
    [data],
  );

  return {
    data,
    loading,
    error,
    addItem,
    updateItem,
    removeItem,
    searchItems,
    getItem,
    refresh: loadData,
    count: data.length,
  };
}

// Real-time statistics hook
export function useRealtimeStats() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalTeachers: 0,
    activeNotices: 0,
    upcomingEvents: 0,
    pendingApplications: 0,
    totalRevenue: 0,
    collectionRate: 0,
    lastUpdated: new Date(),
  });

  const updateStats = useCallback(() => {
    try {
      // Get data from localStorage
      const students = JSON.parse(
        localStorage.getItem("chkms_students") || "[]",
      );
      const teachers = JSON.parse(
        localStorage.getItem("chkms_teachers") || "[]",
      );
      const notices = JSON.parse(localStorage.getItem("chkms_notices") || "[]");
      const events = JSON.parse(localStorage.getItem("chkms_events") || "[]");
      const applications = JSON.parse(
        localStorage.getItem("chkms_admission_applications") || "[]",
      );

      // Calculate stats
      const activeStudents = students.filter((s: any) => s.isActive).length;
      const activeTeachers = teachers.filter((t: any) => t.isActive).length;
      const activeNotices = notices.filter((n: any) => n.isActive).length;
      const upcomingEvents = events.filter(
        (e: any) =>
          new Date(e.startDate) > new Date() && e.status === "scheduled",
      ).length;
      const pendingApplications = applications.filter(
        (a: any) => a.status === "pending",
      ).length;

      setStats({
        totalStudents: activeStudents,
        totalTeachers: activeTeachers,
        activeNotices,
        upcomingEvents,
        pendingApplications,
        totalRevenue: Math.floor(Math.random() * 500000) + 200000, // Mock data
        collectionRate: Math.floor(Math.random() * 20) + 80, // Mock data
        lastUpdated: new Date(),
      });
    } catch (error) {
      console.error("Error updating stats:", error);
    }
  }, []);

  useEffect(() => {
    updateStats();

    // Update stats every 30 seconds
    const interval = setInterval(updateStats, 30000);

    // Listen for storage changes
    const handleStorageChange = () => updateStats();
    window.addEventListener("storage", handleStorageChange);

    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [updateStats]);

  return { stats, refresh: updateStats };
}

// Notification system hook
export function useNotifications() {
  const [notifications, setNotifications] = useState<
    Array<{
      id: string;
      type: "success" | "error" | "warning" | "info";
      title: string;
      message: string;
      timestamp: Date;
    }>
  >([]);

  const addNotification = useCallback(
    (
      type: "success" | "error" | "warning" | "info",
      title: string,
      message: string,
    ) => {
      const notification = {
        id: Date.now().toString(),
        type,
        title,
        message,
        timestamp: new Date(),
      };

      setNotifications((prev) => [notification, ...prev].slice(0, 10)); // Keep only last 10

      // Auto remove after 5 seconds
      setTimeout(() => {
        setNotifications((prev) =>
          prev.filter((n) => n.id !== notification.id),
        );
      }, 5000);
    },
    [],
  );

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  return {
    notifications,
    addNotification,
    removeNotification,
    clearAll: () => setNotifications([]),
  };
}

// Simple localStorage hook with default value
export function useLocalStorage<T>(key: string, defaultValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return defaultValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}

// Search and filter hook
export function useSearch<T>(
  data: T[],
  searchFields: (keyof T)[],
  filters?: Record<string, any>,
) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState<T[]>(data);

  useEffect(() => {
    let result = data;

    // Apply search
    if (searchTerm.trim()) {
      result = result.filter((item) =>
        searchFields.some((field) => {
          const value = item[field];
          return (
            typeof value === "string" &&
            value.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }),
      );
    }

    // Apply filters
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== "") {
          result = result.filter((item: any) => {
            if (Array.isArray(value)) {
              return value.includes(item[key]);
            }
            return item[key] === value;
          });
        }
      });
    }

    setFilteredData(result);
  }, [data, searchTerm, filters, searchFields]);

  return {
    searchTerm,
    setSearchTerm,
    filteredData,
    resultCount: filteredData.length,
  };
}

// Pagination hook
export function usePagination<T>(data: T[], itemsPerPage: number = 10) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const nextPage = () => goToPage(currentPage + 1);
  const prevPage = () => goToPage(currentPage - 1);

  // Reset to page 1 when data changes
  useEffect(() => {
    setCurrentPage(1);
  }, [data.length]);

  return {
    currentPage,
    totalPages,
    currentData,
    goToPage,
    nextPage,
    prevPage,
    hasNext: currentPage < totalPages,
    hasPrev: currentPage > 1,
    startIndex: startIndex + 1,
    endIndex: Math.min(endIndex, data.length),
    totalItems: data.length,
  };
}
