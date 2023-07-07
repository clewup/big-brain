import { create } from 'zustand'

interface EditorStore {
    activeGuideIndex: number
    activeSectionIndex: number
    setActiveGuideIndex: (index: number) => void
    setActiveSectionIndex: (index: number) => void
}

const useEditorStore = create<EditorStore>((set) => ({
    activeGuideIndex: 0,
    activeSectionIndex: 0,
    setActiveGuideIndex: (index: number) => set({ activeGuideIndex: index }),
    setActiveSectionIndex: (index: number) => set({ activeSectionIndex: index }),
}))

export default useEditorStore
