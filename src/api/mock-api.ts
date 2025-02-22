import { Task } from "../types/global.types";

class MockAPI {
    private db: IDBDatabase | null = null;
    private readonly DB_NAME = "TaskManagerDB";
    private readonly DB_VERSION = 1;
    private readonly STORE_NAME = "tasks";
  
    constructor() {
      this._initDB();
    }
  
    private _initDB() {
      const request = indexedDB.open(this.DB_NAME, this.DB_VERSION);
  
      request.onerror = (event) => console.error("Error opening IndexedDB:", event);
  
      request.onsuccess = (event: any) => {
        this.db = event.target.result;
        console.log("IndexedDB initialized");
      };
  
      request.onupgradeneeded = (event: any) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(this.STORE_NAME)) {
          const store = db.createObjectStore(this.STORE_NAME, { keyPath: "id", autoIncrement: true });
          store.createIndex("title", "title", { unique: false });
          store.createIndex("priority", "priority", { unique: false });
          store.createIndex("due_date", "due_date", { unique: false }); // Add due_date index
        } else {
          const store = event.target.transaction.objectStore(this.STORE_NAME);
          if (!store.indexNames.contains("due_date")) {
            store.createIndex("due_date", "due_date", { unique: false });
          }
        }
      };
    }
  
    private _simulateDelay() {
      return new Promise((resolve) => setTimeout(resolve, Math.random() * 500 + 300));
    }
  
    createTask(task: Omit<Task, "id">): Promise<Task> {
      return this._simulateDelay().then(() => {
        return new Promise((resolve, reject) => {
          const transaction = this.db!.transaction([this.STORE_NAME], "readwrite");
          const store = transaction.objectStore(this.STORE_NAME);
          const request = store.add(task);
          request.onsuccess = (event: any) => resolve({ ...task, id: event.target.result });
          request.onerror = () => reject("Error creating task");
        });
      });
    }
  
    getTask(id: number): Promise<Task | undefined> {
      return this._simulateDelay().then(() => {
        return new Promise((resolve, reject) => {
          const transaction = this.db!.transaction([this.STORE_NAME], "readonly");
          const store = transaction.objectStore(this.STORE_NAME);
          const request = store.get(id);
          request.onsuccess = (event: any) => resolve(event.target.result);
          request.onerror = () => reject("Error retrieving task");
        });
      });
    }
  
    getAllTasks(): Promise<Task[]> {
      return this._simulateDelay().then(() => {
        return new Promise((resolve, reject) => {
          const transaction = this.db!.transaction([this.STORE_NAME], "readonly");
          const store = transaction.objectStore(this.STORE_NAME);
          const tasks: Task[] = [];
          const request = store.openCursor();
          request.onsuccess = (event: any) => {
            const cursor = event.target.result;
            if (cursor) {
              tasks.push(cursor.value);
              cursor.continue();
            } else {
              resolve(tasks);
            }
          };
          request.onerror = () => reject("Error retrieving tasks");
        });
      });
    }
  
    updateTask(task: Task): Promise<Task> {
      return this._simulateDelay().then(() => {
        return new Promise((resolve, reject) => {
          const transaction = this.db!.transaction([this.STORE_NAME], "readwrite");
          const store = transaction.objectStore(this.STORE_NAME);
          const request = store.put(task);
          request.onsuccess = () => resolve(task);
          request.onerror = () => reject("Error updating task");
        });
      });
    }

    searchTasks(query: string): Promise<Task[]> {
        return this._simulateDelay().then(() => {
          return new Promise((resolve, reject) => {
            const transaction = this.db!.transaction([this.STORE_NAME], "readonly");
            const store = transaction.objectStore(this.STORE_NAME);
            const tasks: Task[] = [];
            const request = store.openCursor();
      
            request.onsuccess = (event: any) => {
              const cursor = event.target.result;
              if (cursor) {
                const task: Task = cursor.value;
                if (
                  task.title.toLowerCase().includes(query.toLowerCase()) ||
                  task.description.toLowerCase().includes(query.toLowerCase())
                ) {
                  tasks.push(task);
                }
                cursor.continue();
              } else {
                resolve(tasks);
              }
            };
      
            request.onerror = () => reject("Error searching tasks");
          });
        });
      }
      
    deleteTask(id: number): Promise<number> {
      return this._simulateDelay().then(() => {
        return new Promise((resolve, reject) => {
          const transaction = this.db!.transaction([this.STORE_NAME], "readwrite");
          const store = transaction.objectStore(this.STORE_NAME);
          const request = store.delete(id);
          request.onsuccess = () => resolve(id);
          request.onerror = () => reject("Error deleting task");
        });
      });
    }
  }
  
  const mockAPI = new MockAPI();
  export default mockAPI;
