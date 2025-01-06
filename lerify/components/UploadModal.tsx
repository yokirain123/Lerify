"use client";

import React, { useState } from "react";
import Modal from "./Modal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useUser } from "@/hooks/useUser";
import useUploadModal from "@/hooks/useUploadModal";
import Input from "./Input";
import Button from "./Button";
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
      setSelectedSong(null); // Reset file display
      setSelectedImage(null); // Reset file display
      uploadModal.onClose();
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);

      const imageFile = values.image?.[0];
      const songFile = values.song?.[0];

      if (!imageFile || !songFile || !user) {
        toast.error("Missing fields");
        return;
      }

      const uniqueID = uniqid();

      //Загрузить пісню
      const { data: songData, error: songError } = await supabaseClient.storage
        .from("songs")
        .upload(`song-${values.title}-${uniqueID}`, songFile, {
          cacheControl: "3600",
          upsert: false,
        });
      if (songError) {
        setIsLoading(false);
        return toast.error("Failed song upload");
      }

      //Загрузить пісню
      const { data: imageData, error: imageError } =
        await supabaseClient.storage
          .from("images")
          .upload(`images-${values.title}-${uniqueID}`, imageFile, {
            cacheControl: "3600",
            upsert: false,
          });
      if (imageError) {
        setIsLoading(false);
        return toast.error("Failed image upload");
      }

      const  {
        error: supabaseError
      } = await supabaseClient.from('songs').insert({
        user_id: user.id,
        title: values.title,
        author: values.author,
        image_path: imageData.path,
        song_path: songData.path  
      })

      if (supabaseError) {
        setIsLoading(false)
        return toast.error(supabaseError.message)
      }
      

      router.refresh();
      setIsLoading(false);
      toast.success('Song created!');
      reset();
      uploadModal.onClose();

    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
    setSelectedSong(null);
    setSelectedImage(null);
  };

  return (
    <Modal
      title="Upload Your Music"
      description="Fill out the details and upload your song file and cover image."
      isOpen={uploadModal.isOpen}
      onChange={onChange}
    >
      <form
        className="flex flex-col gap-[1px] relative"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          className="rounded-t-xl"
          id="title"
          disabled={isLoading}
          {...register("title", { required: true })}
          placeholder="Song Title"
        />
        <Input
          className="rounded-b-xl"
          id="author"
          disabled={isLoading}
          {...register("author", { required: true })}
          placeholder="Song Author"
        />
        <ul className="flex flex-col gap-5 mt-5">
          <li>
            <div className="pb-1">Select a song file</div>
            <label
              htmlFor="song"
              className="p-3 bg-bg-color hover:text-accent-color transition duration-300 text-center cursor-pointer absolute w-[100%] rounded-xl"
            >
              {selectedSong || "Choose a song"}
            </label>
            <Input
              className="cursor-pointer invisible"
              id="song"
              type="file"
              disabled={isLoading}
              {...register("song", { required: true })}
              accept=".mp3" // Set the selected song
            />
          </li>
          <li>
            <div className="pb-1">Select an image</div>
            <label
              htmlFor="image"
              className="p-3 bg-bg-color hover:text-accent-color transition duration-300 text-center cursor-pointer absolute w-[100%] rounded-xl"
              aria-placeholder=""
            >
              {selectedImage || "Choose an image"}
            </label>
            <Input
              className="cursor-pointer invisible"
              id="image"
              type="file"
              disabled={isLoading}
              {...register("image", { required: true })}
              accept="image/*" // Set the selected image
            />
          </li>
        </ul>
        <div className="w-full border-[#14180c] border-small my-3"></div>
        <Button
          className="rounded-xl border-accent-color border-2 font-bold p-6 flex items-center justify-center"
          disabled={isLoading}
          type="submit"
        >
          Upload song
        </Button>
      </form>
    </Modal>
  );
};

export default UploadModal;
