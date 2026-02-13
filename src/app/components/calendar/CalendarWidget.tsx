import React, { useState } from "react";
import { Calendar, ChevronLeft, ChevronRight, Plus, X, Bell, FileText } from "lucide-react";
import { Button } from "@/app/components/design-system/Button";
import { cn } from "@/app/components/design-system/utils";
import { motion, AnimatePresence } from "framer-motion";

interface Reminder {
  id: string;
  date: string;
  title: string;
  type: 'reminder' | 'note' | 'alert';
  time?: string;
}

export function CalendarWidget() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [reminders, setReminders] = useState<Reminder[]>([
    { id: '1', date: '2025-02-15', title: '健康检查提醒', type: 'reminder', time: '10:00' },
    { id: '2', date: '2025-02-20', title: '产品到货通知', type: 'alert', time: '14:30' },
  ]);
  const [newReminder, setNewReminder] = useState({ title: '', date: '', time: '', type: 'reminder' as Reminder['type'] });

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const today = new Date();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleAddReminder = () => {
    if (newReminder.title && newReminder.date) {
      setReminders([...reminders, { ...newReminder, id: Date.now().toString() }]);
      setNewReminder({ title: '', date: '', time: '', type: 'reminder' });
      setShowModal(false);
    }
  };

  const handleDeleteReminder = (id: string) => {
    setReminders(reminders.filter(r => r.id !== id));
  };

  const getRemindersForDate = (date: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
    return reminders.filter(r => r.date === dateStr);
  };

  return (
    <>
      {/* Calendar Button */}
      <div className="relative">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-xl h-11 w-11 bg-white/50 border border-white shadow-sm hover:shadow-md relative"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <Calendar className="w-5 h-5" />
          {reminders.length > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-coral rounded-full text-white text-[10px] flex items-center justify-center font-bold">
              {reminders.length}
            </span>
          )}
        </Button>

        {/* Expanded Calendar */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              className="absolute top-full right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-neutral-100 overflow-hidden z-50"
            >
              {/* Calendar Header */}
              <div className="p-4 bg-gradient-to-r from-brand-hailan-blue to-brand-aurora-purple text-white">
                <div className="flex items-center justify-between mb-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-lg hover:bg-white/20 text-white"
                    onClick={handlePrevMonth}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <div className="text-center">
                    <div className="font-bold">{currentDate.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long' })}</div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-lg hover:bg-white/20 text-white"
                    onClick={handleNextMonth}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>

                {/* Weekday Headers */}
                <div className="grid grid-cols-7 gap-1 text-[10px] text-white/70">
                  {['日', '一', '二', '三', '四', '五', '六'].map((day) => (
                    <div key={day} className="text-center py-1">{day}</div>
                  ))}
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="p-4">
                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                    <div key={`empty-${i}`} />
                  ))}
                  {Array.from({ length: daysInMonth }).map((_, i) => {
                    const date = i + 1;
                    const isToday = today.getDate() === date && 
                                   today.getMonth() === currentDate.getMonth() && 
                                   today.getFullYear() === currentDate.getFullYear();
                    const dayReminders = getRemindersForDate(date);

                    return (
                      <button
                        key={date}
                        className={cn(
                          "aspect-square rounded-lg text-xs font-medium transition-all relative",
                          isToday && "bg-brand-hailan-blue text-white font-bold",
                          !isToday && "hover:bg-neutral-50 text-neutral-700",
                          dayReminders.length > 0 && !isToday && "text-brand-hailan-blue font-bold"
                        )}
                      >
                        {date}
                        {dayReminders.length > 0 && (
                          <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-brand-coral rounded-full" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Reminders List */}
                <div className="mt-4 space-y-2 max-h-40 overflow-y-auto">
                  {reminders.length === 0 ? (
                    <p className="text-xs text-neutral-400 text-center py-4">暂无提醒事项</p>
                  ) : (
                    reminders.map((reminder) => (
                      <div
                        key={reminder.id}
                        className="flex items-start gap-2 p-2 rounded-lg bg-neutral-50 hover:bg-neutral-100 transition-colors group"
                      >
                        <div className={cn(
                          "w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0",
                          reminder.type === 'reminder' && "bg-blue-100 text-blue-600",
                          reminder.type === 'note' && "bg-green-100 text-green-600",
                          reminder.type === 'alert' && "bg-red-100 text-red-600"
                        )}>
                          {reminder.type === 'reminder' && <Bell className="w-3 h-3" />}
                          {reminder.type === 'note' && <FileText className="w-3 h-3" />}
                          {reminder.type === 'alert' && <Bell className="w-3 h-3" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-medium text-neutral-900 truncate">{reminder.title}</div>
                          <div className="text-[10px] text-neutral-500">
                            {reminder.date} {reminder.time}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => handleDeleteReminder(reminder.id)}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    ))
                  )}
                </div>

                {/* Add Button */}
                <Button
                  className="w-full mt-3 bg-brand-hailan-blue hover:bg-brand-hailan-blue/90 text-white rounded-xl h-9 font-bold text-sm"
                  onClick={() => setShowModal(true)}
                >
                  <Plus className="w-4 h-4 mr-1" />
                  添加提醒
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Add Reminder Modal */}
      <AnimatePresence>
        {showModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
              onClick={() => setShowModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-2xl shadow-2xl z-[70] p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-brand-hailan-blue">添加提醒事项</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-lg"
                  onClick={() => setShowModal(false)}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-neutral-700 mb-2 block">标题</label>
                  <input
                    type="text"
                    value={newReminder.title}
                    onChange={(e) => setNewReminder({ ...newReminder, title: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-brand-hailan-blue/20"
                    placeholder="输入提醒标题"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-neutral-700 mb-2 block">日期</label>
                    <input
                      type="date"
                      value={newReminder.date}
                      onChange={(e) => setNewReminder({ ...newReminder, date: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-brand-hailan-blue/20"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-neutral-700 mb-2 block">时间</label>
                    <input
                      type="time"
                      value={newReminder.time}
                      onChange={(e) => setNewReminder({ ...newReminder, time: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-brand-hailan-blue/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-neutral-700 mb-2 block">类型</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['reminder', 'note', 'alert'] as const).map((type) => (
                      <button
                        key={type}
                        onClick={() => setNewReminder({ ...newReminder, type })}
                        className={cn(
                          "py-2 px-4 rounded-xl border-2 text-sm font-medium transition-all",
                          newReminder.type === type
                            ? "border-brand-hailan-blue bg-brand-hailan-blue text-white"
                            : "border-neutral-200 hover:border-neutral-300"
                        )}
                      >
                        {type === 'reminder' && '提醒'}
                        {type === 'note' && '备注'}
                        {type === 'alert' && '警报'}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    variant="outline"
                    className="flex-1 rounded-xl h-11"
                    onClick={() => setShowModal(false)}
                  >
                    取消
                  </Button>
                  <Button
                    className="flex-1 bg-brand-hailan-blue hover:bg-brand-hailan-blue/90 text-white rounded-xl h-11 font-bold"
                    onClick={handleAddReminder}
                  >
                    确认添加
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
