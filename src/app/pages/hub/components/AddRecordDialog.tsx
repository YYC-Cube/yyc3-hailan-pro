import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/app/components/ui/dialog";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { Textarea } from "@/app/components/ui/textarea";
import { HealthRecord } from "@/lib/healthRecord";
import { FileText, Upload } from "lucide-react";

interface AddRecordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (record: Omit<HealthRecord, "id" | "isEncrypted">) => void;
}

export function AddRecordDialog({ open, onOpenChange, onAdd }: AddRecordDialogProps) {
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate encryption delay
    setTimeout(() => {
      const formData = new FormData(e.target as HTMLFormElement);
      onAdd({
        title: formData.get("title") as string,
        date: formData.get("date") as string,
        type: formData.get("type") as any,
        securityLevel: formData.get("securityLevel") as any,
      });
      setLoading(false);
      onOpenChange(false);
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>导入新的医疗记录</DialogTitle>
          <DialogDescription>
            所有上传的文件将在本地进行 AES-256 加密，然后再同步到云端保险库。
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">记录名称</Label>
            <Input id="title" name="title" placeholder="例如：2026 血常规检查" required />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="date">日期</Label>
              <Input id="date" name="date" type="date" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="type">类型</Label>
              <Select name="type" required defaultValue="Lab Result">
                <SelectTrigger>
                  <SelectValue placeholder="选择类型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Lab Result">实验室化验</SelectItem>
                  <SelectItem value="Imaging">影像学检查</SelectItem>
                  <SelectItem value="Clinical Note">临床诊断</SelectItem>
                  <SelectItem value="Prescription">处方单</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="securityLevel">安全等级</Label>
            <Select name="securityLevel" required defaultValue="High">
              <SelectTrigger>
                <SelectValue placeholder="选择等级" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Standard">标准 (Standard)</SelectItem>
                <SelectItem value="High">高 (High)</SelectItem>
                <SelectItem value="Maximum">最高绝密 (Maximum)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label>附件文件</Label>
            <div className="border-2 border-dashed border-neutral-200 rounded-xl p-6 flex flex-col items-center justify-center text-neutral-400 hover:border-brand-hailan-blue hover:text-brand-hailan-blue transition-colors cursor-pointer bg-neutral-50/50">
              <Upload className="w-8 h-8 mb-2" />
              <span className="text-xs font-bold uppercase tracking-wide">点击上传或拖拽文件</span>
              <span className="text-[10px] opacity-50 mt-1">支持 PDF, DICOM, JPG</span>
            </div>
          </div>
          
          <DialogFooter>
             <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>取消</Button>
             <Button type="submit" disabled={loading} className="bg-brand-hailan-blue text-white">
                {loading ? "正在加密..." : "加密并导入"}
             </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
