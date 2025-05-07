import NoteCreateView from '@/features/note/views/NoteCreateView.vue'
import NoteDetailView from '@/features/note/views/NoteDetailView.vue'
import NoteEditView from '@/features/note/views/NoteEditView.vue'
import NoteListView from '@/features/note/views/NoteListView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'note-list',
      component: NoteListView,
    },
    {
      path: '/:id/edit',
      name: 'edit-note',
      component: NoteEditView,
    },
    {
      path: '/create',
      name: 'create-note',
      component: NoteCreateView,
    },
    {
      path: '/:id',
      name: 'note-detail',
      component: NoteDetailView,
    },
    {
      path: '/:patchMatch(.*)*',
      name: 'not-found',
      component: NotFoundView,
    },
  ],
})

export default router
