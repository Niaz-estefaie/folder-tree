import React, { useState } from "react";
import FileTreeItem from "./FileTreeItem";
import fileStructure from "../../data/fileStructure";
import { FileItem, TreeItem } from "../../types/fileStructureTypes";
import "./FileTree.css";

const FileTree: React.FC = () => {
  const [treeData, setTreeData] = useState<TreeItem[]>(fileStructure);
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);

  const handleAdd = (parent: TreeItem, type: "file" | "folder") => {
    const newItem: TreeItem = type === "file"
      ? { name: "newFile.js", type: "file" }
      : { name: "New Folder", type: "folder", children: [] };
  
    const updateTree = (data: TreeItem[]): TreeItem[] => {
      return data.map((item) => {
        if (item === parent) {
          if (item.type === "folder") {
            return { ...item, children: [...item.children, newItem] };
          }
          return item;
        }
        if (item.type === "folder") {
          return { ...item, children: updateTree(item.children) };
        }
        return item;
      });
    };
  
    setTreeData(updateTree(treeData));
  };
  

  const handleDelete = (itemToDelete: TreeItem) => {
    const deleteFromTree = (data: TreeItem[]): TreeItem[] => {
      return data.filter((item) => {
        if (item === itemToDelete) {
          return false;
        }
        if (item.type === "folder" && item.children) {
          item.children = deleteFromTree(item.children);
        }
        return true;
      });
    };

    setTreeData(deleteFromTree(treeData));
  };

  const handleRename = (itemToRename: TreeItem) => {
    const newName = prompt("Enter new name:", itemToRename.name);
    if (!newName) return;

    const renameInTree = (data: TreeItem[]): TreeItem[] => {
      return data.map((item) => {
        if (item === itemToRename) {
          return { ...item, name: newName };
        }
        if (item.type === "folder" && item.children) {
          return { ...item, children: renameInTree(item.children) };
        }
        return item;
      });
    };

    setTreeData(renameInTree(treeData));
  };

  const handleSelect = (item: TreeItem) => {
    if (item.type === "file") {
      setSelectedFile(item);
    }
  };

  return (
    <div className="file-tree">
      {treeData.map((item, index) => (
        <FileTreeItem
          key={index}
          item={item}
          onAdd={handleAdd}
          onDelete={handleDelete}
          onRename={handleRename}
          onSelect={handleSelect}
        />
      ))}
      {selectedFile && (
        <div className="file-content">
          <h3>{selectedFile.name}</h3>
          <pre>
            Placeholder for file content: {selectedFile.name}
          </pre>
        </div>
      )}
    </div>
  );
};

export default FileTree;
