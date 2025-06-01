import React, { useState } from "react";
import Modal from "./Modal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useUser } from "@/hooks/useUser";
import useUploadModal from "@/hooks/useUploadModal";
import Input from "../UI/Input";
import Button from "../UI/Button";
import uniqid from "uniqid";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";

const UploadModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSong, setSelectedSong] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { user } = useUser();
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const uploadModal = useUploadModal();
  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      author: "",
      title: "",
      song: null,
      image: null,
    },
  });

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      setSelectedSong(null);
      setSelectedImage(null);
      uploadModal.onClose();
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);

      const imageFile = values.image?.[0];
      const songFile = values.song?.[0];

      if (!imageFile || !songFile || !user) {
        toast.error("Будь ласка, виберіть файл пісні та зображення");
        return;
      }

      const uniqueID = uniqid();

      const { data: songData, error: songError } = await supabaseClient.storage
        .from("songs")
        .upload(`song-${values.title}-${uniqueID}`, songFile, {
          cacheControl: "3600",
          upsert: false,
        });
      if (songError) {
        setIsLoading(false);
        return toast.error("Не вдалося завантажити пісню");
      }

      const { data: imageData, error: imageError } =
        await supabaseClient.storage
          .from("images")
          .upload(`images-${values.title}-${uniqueID}`, imageFile, {
            cacheControl: "3600",
            upsert: false,
          });
      if (imageError) {
        setIsLoading(false);
        return toast.error("Не вдалося завантажити зображення");
      }

      const { error: supabaseError } = await supabaseClient
        .from("songs")
        .insert({
          user_id: user.id,
          title: values.title,
          author: values.author,
          image_path: imageData.path,
          song_path: songData.path,
        });

      if (supabaseError) {
        setIsLoading(false);
        return toast.error(supabaseError.message);
      }

      router.refresh();
      setIsLoading(false);
      toast.success("Пісня успішно завантажена!");
      reset();
      uploadModal.onClose();
    } catch (error) {
      toast.error("Щось пішло не так, спробуйте ще раз.");
    } finally {
      setIsLoading(false);
    }
    setSelectedSong(null);
    setSelectedImage(null);
  };

  return (
    <Modal
      title="Завантажити свою пісню"
      description="Введіть деталі вашої пісні та завантажте її разом із зображенням обкладинки."
      isOpen={uploadModal.isOpen}
      onChange={onChange}
    >
      <form
        className="flex flex-col gap-[1px] relative"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          className="rounded-t-xl bg-[#e0e0e0] dark:bg-[#232323]"
          id="title"
          disabled={isLoading}
          {...register("title", { required: true })}
          placeholder="Назва пісні"
        />
        <Input
          className="rounded-b-xl bg-[#e0e0e0] dark:bg-[#232323]"
          id="author"
          disabled={isLoading}
          {...register("author", { required: true })}
          placeholder="Автор пісні"
        />
        <ul className="flex flex-col gap-5 mt-5">
          <li>
            <div className="pb-1">Виберіть файл пісні</div>
            <label
              htmlFor="song"
              className="p-3 bg-[#e0e0e0] dark:bg-[#232323] hover:text-accent-color transition duration-300 text-center cursor-pointer absolute w-[100%] rounded-xl"
            >
              {selectedSong || "Виберіть файл пісні"}
            </label>
            <Input
              className="cursor-pointer invisible"
              id="song"
              type="file"
              disabled={isLoading}
              {...register("song", { required: true })}
              accept=".mp3"
            />
          </li>
          <li>
            <div className="pb-1">Виберіть файл зображення</div>
            <label
              htmlFor="image"
              className="p-3 bg-[#e0e0e0] dark:bg-[#232323] hover:text-accent-color transition duration-300 text-center cursor-pointer absolute w-[100%] rounded-xl"
              aria-placeholder=""
            >
              {selectedImage || "Виберіть файл зображення"}
            </label>
            <Input
              className="cursor-pointer invisible"
              id="image"
              type="file"
              disabled={isLoading}
              {...register("image", { required: true })}
              accept="image/*"
            />
          </li>
        </ul>

        {isLoading && (
          <div className="flex justify-center items-center mt-4 text-center">
            <div className="loader"></div>
            <span className="ml-2">Завантажується, зачекайте хвильку...</span>
          </div>
        )}

        <div className="w-full my-3"></div>
        <Button
          className="rounded-xl border-accent-color border-2 font-bold p-6 flex items-center justify-center"
          disabled={isLoading}
          type="submit"
        >
          Завантажити пісню
        </Button>
      </form>
    </Modal>
  );
};

export default UploadModal;
