export type FileItem = {
  name: string;
  type: "file";
  children?: undefined | [] | FileItem;
};

export type FolderItem = {
  name: string;
  type: "folder";
  children: Array<FileItem | FolderItem>;
};

export type TreeItem = FileItem | FolderItem;

export interface FileTreeItemProps {
  item: TreeItem;
  onAdd: (parent: TreeItem, type: "file" | "folder") => void;
  onDelete: (item: TreeItem) => void;
  onRename: (item: TreeItem) => void;
  onSelect: (item: FileItem) => void;
}
