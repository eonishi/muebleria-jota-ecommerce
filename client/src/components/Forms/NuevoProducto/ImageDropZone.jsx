import { Controller } from "react-hook-form";
import { Image } from "@unpic/react";
import { useDropzone } from "react-dropzone";
import BackgroundImage from "./BackgroundImage";
import './NuevoProducto.css';

export default function ImageDropZone({ control, errors, name }) {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={null}
      render={({ field }) => {
        // useDropzone dentro del Controller
        const { getRootProps, getInputProps, isFocused } = useDropzone({
          accept: { "image/*": [] },
          maxFiles: 1,
          onDrop: (acceptedFiles) => {
            field.onChange(acceptedFiles[0] || null);
          },
        });

        return (
          <div className='image-container justify-self-center'>
            {field.value && (
              <>
                <img
                  src={URL.createObjectURL(field.value)}
                  alt='Vista previa'
                  className='image-display'
                  style={{ opacity: field.value ? "1" : "0" }}
                  // Eliminar el ObjectURL para evitar memory leaks
                  onLoad={(e) => URL.revokeObjectURL(e.target.src)}
                />
                <button
                  type='button'
                  className='absolute right-5 top-5 z-10 cursor-pointer bg-neutral-300 rounded-full p-2 flex justify-center items-center'
                  onClick={() => field.onChange(null)}
                >
                  <Image src="/assets/icons/xmark.svg" alt="remove current image" layout="fixed" />
                </button>
              </>
            )}

            <div
              {...getRootProps()}
              className='dropzone'
              style={{
                borderColor: isFocused
                  ? "#a0522d"
                  : errors[name]
                    ? "#dc3545"
                    : "#ccc",
                // Ocultamos la dropzone si ya hay una imagen cargada
                display: field.value ? "none" : "flex",
              }}
            >
              <input {...getInputProps()} />
              <p>Arrastra una imagen o haz clic aquí</p>
            </div>

            <BackgroundImage isRendered={field.value} />

            {errors[name] && (
              <p
                className='text-red-700 mt-5'
              >
                {errors[name].message}
              </p>
            )}
          </div>
        )
      }}
    />
  );
}
