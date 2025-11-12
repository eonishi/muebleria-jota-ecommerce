import { Controller } from "react-hook-form";
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
									className='delete-image-btn'
									onClick={() => field.onChange(null)}
								>
									<i className='fa-solid fa-xmark'></i>
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
								className='estado error'
								style={{ marginTop: "0.5rem" }}
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
