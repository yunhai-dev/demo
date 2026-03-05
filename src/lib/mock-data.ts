export interface KnowledgeNode {
  id: string;
  name: string;
  type: 'folder' | 'file';
  children?: KnowledgeNode[];
}

export const INSTITUTIONAL_KNOWLEDGE: KnowledgeNode[] = [
  {
    id: 'inst-1',
    name: '政策文件',
    type: 'folder',
    children: [
      { id: 'file-1', name: '2024年教育发展纲要.pdf', type: 'file' },
      { id: 'file-2', name: '义务教育课程标准.docx', type: 'file' },
    ],
  },
  {
    id: 'inst-2',
    name: '研究报告',
    type: 'folder',
    children: [
      { id: 'file-3', name: '中国教育现代化指数报告.pdf', type: 'file' },
    ],
  },
];

export const SHARED_KNOWLEDGE: KnowledgeNode[] = [
  {
    id: 'shared-1',
    name: '教学资源',
    type: 'folder',
    children: [
      { id: 'file-4', name: '数学名师课件集.pptx', type: 'file' },
      { id: 'file-5', name: '英语听力训练素材.mp3', type: 'file' },
    ],
  },
];

export const PERSONAL_KNOWLEDGE: KnowledgeNode[] = [
  {
    id: 'pers-1',
    name: '我的收藏',
    type: 'folder',
    children: [
      { id: 'file-6', name: '待读研究文献.pdf', type: 'file' },
    ],
  },
];