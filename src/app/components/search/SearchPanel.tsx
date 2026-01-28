/**
 * 搜索面板组件
 * 显示搜索历史、热门搜索和搜索建议
 */

import React, { useState, useEffect } from 'react';
import { Search, Clock, TrendingUp, X, Flame } from 'lucide-react';
import SearchService, { SearchHistory, HotSearch } from '@/app/services/searchService';
import { Button } from '@/app/components/ui/button';
import { cn } from '@/lib/utils';

// ==================== 类型定义 ====================

export interface SearchPanelProps {
  onSearch: (keyword: string) => void;
  className?: string;
}

// ==================== 组件 ====================

export function SearchPanel({ onSearch, className }: SearchPanelProps) {
  const [searchHistory, setSearchHistory] = useState<SearchHistory[]>([]);
  const [hotSearches, setHotSearches] = useState<HotSearch[]>([]);

  // 加载数据
  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setSearchHistory(SearchService.getHistory());
    setHotSearches(SearchService.getHotSearches());
  };

  // 删除历史
  const handleRemoveHistory = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    SearchService.removeHistory(id);
    loadData();
  };

  // 清空历史
  const handleClearHistory = () => {
    SearchService.clearHistory();
    loadData();
  };

  // 点击搜索
  const handleClick = (keyword: string) => {
    onSearch(keyword);
  };

  // 获取趋势图标
  const getTrendIcon = (trend: HotSearch['trend']) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-3 h-3 text-red-500" />;
      case 'new':
        return <Flame className="w-3 h-3 text-orange-500" />;
      default:
        return null;
    }
  };

  return (
    <div className={cn('bg-white rounded-lg border border-border p-6', className)}>
      {/* 搜索历史 */}
      {searchHistory.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-text-tertiary" />
              <h3 className="font-semibold text-text-primary">搜索历史</h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearHistory}
              className="text-text-tertiary hover:text-text-secondary"
            >
              清空
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {searchHistory.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleClick(item.keyword)}
                className="group inline-flex items-center gap-2 px-3 py-1.5 bg-bg-secondary hover:bg-bg-tertiary rounded-lg text-sm text-text-primary transition-colors focus-ring"
              >
                <span>{item.keyword}</span>
                <button
                  type="button"
                  onClick={(e) => handleRemoveHistory(item.id, e)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="删除"
                >
                  <X className="w-3 h-3 text-text-tertiary hover:text-text-primary" />
                </button>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 热门搜索 */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Flame className="w-4 h-4 text-orange-500" />
          <h3 className="font-semibold text-text-primary">热门搜索</h3>
        </div>
        <div className="space-y-2">
          {hotSearches.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleClick(item.keyword)}
              className="w-full flex items-center gap-3 px-3 py-2 hover:bg-bg-secondary rounded-lg transition-colors text-left focus-ring group"
            >
              {/* 排名 */}
              <div
                className={cn(
                  'flex-shrink-0 w-5 h-5 flex items-center justify-center text-xs font-bold rounded',
                  item.rank <= 3
                    ? 'bg-gradient-to-br from-red-500 to-orange-500 text-white'
                    : 'bg-bg-tertiary text-text-tertiary'
                )}
              >
                {item.rank}
              </div>

              {/* 关键词 */}
              <span className="flex-1 text-sm text-text-primary group-hover:text-[#0056b3]">
                {item.keyword}
              </span>

              {/* 趋势 */}
              {getTrendIcon(item.trend)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchPanel;
