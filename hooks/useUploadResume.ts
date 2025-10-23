import { useTransition } from "react";
import { toast } from "sonner";

export function useUploadResume() {
  const [isPending, startTransition] = useTransition();

  const getResumeUrl = (key: string) => {
    return `https://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${key}`;
  };

  const deleteResume = async (key: string) => {
    try {
      return await new Promise<boolean>((resolve) => {
        startTransition(async () => {
          const response = await fetch("/api/upload/resume", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ key }),
          });

          if (!response.ok) {
            throw new Error("Failed to delete resume");
          }

          toast.success("Resume deleted successfully");
          resolve(true);
        });
      });
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete resume");
      return false;
    }
  };

  const handleFileUpload = async (
    file: File,
    onChange: (url: string) => void,
  ) => {
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      return;
    }

    if (file.type !== "application/pdf") {
      toast.error("Invalid file type. Please upload a PDF file.");
      return;
    }

    try {
      startTransition(async () => {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/upload/resume", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to upload file");
        }

        const { data } = await response.json();
        onChange(data.key);
        toast.success("Resume uploaded successfully");
      });
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload resume");
    }
  };

  return {
    handleFileUpload,
    deleteResume,
    getResumeUrl,
    isPending,
  };
}
