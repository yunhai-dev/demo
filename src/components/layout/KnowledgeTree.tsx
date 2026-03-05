'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Folder, FileText, Plus, MoreHorizontal } from 'lucide-react';
import { KnowledgeNode } from '@/lib/mock-data';
import { Checkbox } from '@/components/ui/checkbox';
import { useSelection } from '@/context/SelectionContext';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

interface TreeItemProps {
  node: KnowledgeNode;
  level?: number;
}

const TreeItem = ({ node, level = 0 }: TreeItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { selectedIds, toggleSelection } = useSelection();

  const isSelected = selectedIds.has(node.id);
  const isFolder = node.type === 'folder';

  return (
    <div className="w-full">
      <div 
        className={cn(
          "group flex items-center py-1.5 px-2 hover:bg-accent/50 rounded-md cursor-pointer transition-colors sidebar-tree-item",
          level > 0 && "ml-4"
        )}
      >
        <div className="flex items-center flex-1 min-w-0" onClick={() => isFolder && setIsOpen(!isOpen)}>
          {isFolder ? (
            <div className="mr-1 text-muted-foreground">
              {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </div>
          ) : (
            <div className="w-5" />
          )}
          
          <Checkbox 
            checked={isSelected}
            onCheckedChange={() => toggleSelection(node.id)}
            className="mr-2 h-4 w-4"
            onClick={(e) => e.stopPropagation()}
          />
          
          <div className="mr-2 text-primary/80">
            {isFolder ? <Folder className="h-4 w-4 fill-primary/20" /> : <FileText className="h-4 w-4" />}
          </div>
          
          <span className="text-sm truncate text-foreground/80 font-medium">
            {node.name}
          </span>
        </div>

        <div className="flex items-center gap-1 item-actions">
          {isFolder && (
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <Plus className="h-3 w-3" />
            </Button>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <MoreHorizontal className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>查看</DropdownMenuItem>
              <DropdownMenuItem>重命名</DropdownMenuItem>
              <DropdownMenuItem>共享设置</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">删除</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {isFolder && isOpen && node.children && (
        <div className="border-l border-muted ml-4 mt-1">
          {node.children.map((child) => (
            <TreeItem key={child.id} node={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export function KnowledgeTree({ nodes }: { nodes: KnowledgeNode[] }) {
  return (
    <div className="space-y-1">
      {nodes.map((node) => (
        <TreeItem key={node.id} node={node} />
      ))}
    </div>
  );
}