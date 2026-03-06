export interface KnowledgeNode {
  id: string;
  name: string;
  type: 'folder' | 'file';
  children?: KnowledgeNode[];
}

export interface ChatHistoryItem {
  id: string;
  title: string;
  date: string;
  preview: string;
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

export const CHATS_HISTORY: ChatHistoryItem[] = [
  {
    id: 'chat-1',
    title: '数字化转型方案讨论',
    date: '2024-03-05 14:20',
    preview: '关于航空工业数字化转型大纲的深度探讨...',
  },
  {
    id: 'chat-2',
    title: '航空技术规范解读',
    date: '2024-03-04 09:15',
    preview: '针对最新下发的安全生产技术标准的详细拆解...',
  },
  {
    id: 'chat-3',
    title: '科研项目进度汇报',
    date: '2024-03-02 16:45',
    preview: '总结了第一季度某型号研制的关键路径与风险点...',
  },
  {
    id: 'chat-4',
    title: '行业发展趋势分析',
    date: '2024-02-28 11:30',
    preview: '基于权威数据的全球航空产业格局演变分析...',
  },
];
