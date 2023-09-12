import { writable } from 'svelte/store';
import type { Note } from '../types/notes';

export const focusedNote = writable<Note | null>(null);
export const showHomeworkFilter = writable<boolean>(false);
