import { useState, useCallback } from "react";

export type FSNode = {
    name: string;
    type: "file" | "directory";
    content?: string | React.ReactNode;
    children?: FSNode[];
};

export const useFileSystem = (initialFS: FSNode[]) => {
    const [currentPath, setCurrentPath] = useState<string[]>([]);

    const getDir = (path: string[]) => {
        let current = initialFS;
        for (const segment of path) {
            const found = current.find(n => n.name === segment && n.type === "directory");
            if (!found || !found.children) return null;
            current = found.children;
        }
        return current;
    };

    const ls = useCallback((path?: string) => {
        const targetPath = path ? [...currentPath, ...path.split("/").filter(Boolean)] : currentPath;
        const dir = getDir(targetPath);
        return dir ? dir.map(n => ({ name: n.name, type: n.type })) : null;
    }, [currentPath, initialFS]);

    const cd = useCallback((path: string) => {
        if (path === "/") {
            setCurrentPath([]);
            return true;
        }
        if (path === "..") {
            setCurrentPath(prev => prev.slice(0, -1));
            return true;
        }

        const segments = path.split("/").filter(Boolean);
        let newPath = [...currentPath];

        for (const segment of segments) {
            if (segment === "..") {
                newPath = newPath.slice(0, -1);
            } else {
                const dir = getDir(newPath);
                if (dir && dir.find(n => n.name === segment && n.type === "directory")) {
                    newPath.push(segment);
                } else {
                    return false;
                }
            }
        }

        setCurrentPath(newPath);
        return true;
    }, [currentPath, initialFS]);

    const cat = useCallback((filename: string) => {
        const dir = getDir(currentPath);
        const file = dir?.find(n => n.name === filename && n.type === "file");
        return file?.content ?? null;
    }, [currentPath, initialFS]);

    return {
        currentPath: "/" + currentPath.join("/"),
        ls,
        cd,
        cat
    };
};
