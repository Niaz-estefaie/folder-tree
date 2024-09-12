import { TreeItem } from "../types/fileStructureTypes";

const fileStructure: TreeItem[] = [
    {
      name: "src",
      type: "folder",
      children: [
        { name: "App.js", type: "file" },
        { name: "index.js", type: "file" },
        {
          name: "components",
          type: "folder",
          children: [
            { name: "FileTree.js", type: "file" },
            { name: "FileTreeItem.js", type: "file" },
          ],
        },
      ],
    },
    {
      name: "public",
      type: "folder",
      children: [
        { name: "index.html", type: "file" },
      ],
    },
  ];
  
  export default fileStructure;
  