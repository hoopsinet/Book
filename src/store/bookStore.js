import { create } from 'zustand';

const useBookStore = create((set) => ({
  currentPage: 0,
  chapters: [
    {
      id: 1,
      title: "L'arrivée à Tokyo",
      content: "Notre aventure commence dans les rues animées de Tokyo. Les néons illuminent la nuit, créant une atmosphère unique et envoûtante...",
      image: "/images/chapters/tokyo.jpg"
    },
    {
      id: 2,
      title: "Les Temples de Kyoto",
      content: "Les temples ancestraux de Kyoto nous transportent dans le Japon traditionnel. Les jardins zen et les cérémonies du thé nous révèlent la spiritualité japonaise...",
      image: "/images/chapters/kyoto.jpg"
    },
    {
      id: 3,
      title: "Mont Fuji",
      content: "La majesté du Mont Fuji se dresse devant nous. Son sommet enneigé touche les nuages, symbole éternel du Japon...",
      image: "/images/chapters/fuji.jpg"
    }
  ],
  setCurrentPage: (page) => set({ currentPage: page }),
  nextPage: () => set((state) => ({ 
    currentPage: Math.min(state.currentPage + 1, state.chapters.length - 1) 
  })),
  previousPage: () => set((state) => ({ 
    currentPage: Math.max(state.currentPage - 1, 0) 
  })),
}));

export default useBookStore;
