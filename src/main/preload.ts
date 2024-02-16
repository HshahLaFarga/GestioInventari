// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { rejects } from 'assert';
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

export type Channels = 'ipc-example';

const electronHandler = {
  ipcRenderer: {
    sendMessage(channel: Channels, ...args: unknown[]) {
      ipcRenderer.send(channel, ...args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
    
  },
  db: {
    getAll(data: string): Promise<unknown> {
      return new Promise((resolve, reject) => {
        ipcRenderer
          .invoke('getAll', `SELECT * FROM ${data}`)
          .then((result) => resolve(result))
          .catch((error) => reject(error));
      });
    },
    get(id: number): Promise<unknown>{
      return new Promise((resolve, reject) => {
        ipcRenderer
          .invoke('get', `SELECT * FROM lots WHERE id = ${id}`)
          .then((result) => resolve(result))
          .catch((error) => reject(error));
      });
    },
    destroy(id: number): Promise<unknown> {
      return new Promise((resolve, reject) => {
        ipcRenderer
          .invoke('destroy', `DELETE FROM lots WHERE id = ${id}`)
          .then((result) => resolve(result))
          .catch((error) => reject(error));
      });
    },
    destroyAll(): Promise<unknown> {
      return new Promise((resolve, reject) => {
        ipcRenderer
          .invoke('destroyAll', 'DELETE FROM lots')
          .then((result) => resolve(result))
          .catch((error) => reject(error));
      });
    },
    store(lot: {lot:string, zona:string, data:string}): Promise<unknown>{
      return new Promise((resolve, reject)=>{
        ipcRenderer
          .invoke('store', `INSERT INTO lots (lot, zona, data) VALUES (?, ?, ?)`, [lot.lot, lot.zona, lot.data]).then((result) => resolve(result))
          .catch((error) => reject(error));
      })
    }
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
