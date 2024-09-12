import React, { useState } from "react";
import { FileTreeItemProps } from "../../types/fileStructureTypes";

const FileTreeItem: React.FC<FileTreeItemProps> = ({
  item,
  onAdd,
  onDelete,
  onRename,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  const handleAddFile = () => onAdd(item, "file");
  const handleAddFolder = () => onAdd(item, "folder");

  if (item.type === "folder") {
    return (
      <div className="folder">
        <span onClick={toggleOpen}>
          {isOpen ? "📂" : "📁"} {item.name}
        </span>
        <button onClick={handleAddFile}>+ File</button>
        <button onClick={handleAddFolder}>+ Folder</button>
        <button onClick={() => onDelete(item)}>Delete</button>
        <button onClick={() => onRename(item)}>Rename</button>
        {isOpen && (
          <div className="folder-contents">
            {item.children.map((child, index) => (
              <FileTreeItem
                key={index}
                item={child}
                onAdd={onAdd}
                onDelete={onDelete}
                onRename={onRename}
                onSelect={onSelect}
              />
            ))}
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div className="file">
        📄 {item.name}
        <button onClick={() => onDelete(item)}>Delete</button>
        <button onClick={() => onRename(item)}>Rename</button>
        <button onClick={() => onSelect(item)}>View</button>
      </div>
    );
  }
};

export default FileTreeItem;
