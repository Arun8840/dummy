"use client";

import { cn } from "@/lib/utils";
import React, { useRef, useState } from "react";
import { Label } from "@/components/ui/label";
import { BookImage, Cloud, Image, Minus, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UploaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "type" | "children"> {
    title?: string,
    description?: string
    accept?: string,
    isPending?: boolean
    onUpload?: (value: File | null) => void
}

const baseClass = "border border-dashed  bg-card p-4 rounded-lg flex flex-col gap-2 transition-colors"
export const Uploader: React.FC<UploaderProps> = ({
    className,
    title = "Uploader",
    description = "Upload files to your cloud storage to access them anywhere.",
    accept = "image/*",
    isPending = false,
    onUpload,
    ...props
}) => {
    // * HOOKS
    const inputRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<File | null>(null);


    const fileSize = file && `${(file.size / 1024).toFixed(2)} KB`
    const triggerUploader = () => {
        if (!inputRef.current) return;
        inputRef.current.click();
    };

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e?.target?.files;
        if (files && files.length > 0) {
            setFile(files[0]);
        } else {
            setFile(null);
        }
        if (inputRef.current) {
            inputRef.current.value = "";
        }
    };
    const confirmUpload = () => {
        onUpload?.(file)
    }
    // ! remove file
    const removeFile = () => {
        setFile(null)
        if (inputRef.current) {
            inputRef.current.value = "";
        }
    }

    const previewImage = file ? URL.createObjectURL(file) : undefined;
    return (
        <div
            className={cn(baseClass, className)}
            {...props}
        >
            {/* //* title and desctiption */}
            <div className="flex flex-col lg:flex-row  gap-2  items-center">
                <Button type="button" variant={"secondary"} size={"icon-lg"} className="mx-auto">
                    <Cloud />
                </Button>
                <div className="text-center lg:text-start">
                    <Label className="block text-base font-medium">{title}</Label>
                    <p className="text-sm text-muted-foreground w-4/5 lg:w-full mx-auto">{description}</p>
                </div>
            </div>


            {/* //* selected file */}
            {file && (
                <div className="flex items-center justify-between gap-3 p-2 ">
                    <div className="space-x-2 flex items-center">
                        <Avatar className="rounded-lg">
                            <AvatarImage className="rounded-lg" src={previewImage} />
                            <AvatarFallback className="rounded-lg">
                                <BookImage size={18} />
                            </AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-sm truncate max-w-xs">{file.name}</span>
                    </div>
                    <div className="space-x-2 flex items-center">
                        <span className="text-xs text-primary">
                            {fileSize}
                        </span>
                        <Button onClick={removeFile} size={"icon-sm"} variant={"outline"} type="button" title="Remove">
                            <Minus color="red" />
                        </Button>
                    </div>
                </div>
            )}

            {/* //* file input */}
            <input disabled={isPending} ref={inputRef} type="file" accept={accept} hidden onChange={handleUpload} />
            {
                file ?
                    <div className="grid lg:grid-cols-2 gap-2">
                        <Button onClick={removeFile} disabled={isPending} type="button" variant={"secondary"}>
                            Cancel
                        </Button>
                        <Button onClick={confirmUpload} disabled={isPending} type="button">
                            {
                                isPending ? <span className="animate-pulse">Uploading . . .</span> : "Confirm"
                            }
                        </Button>
                    </div>
                    :
                    <Button disabled={isPending} type="button" onClick={triggerUploader}>
                        Upload <Upload />
                    </Button>
            }
        </div>
    );
};
