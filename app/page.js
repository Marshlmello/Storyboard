"use client";

import { useEffect, useRef, useState } from "react";
import { OPTIONS } from "@/lib/constants";
import OptionButtons from "@/components/OptionButtons";
import { saveAs } from "file-saver";


export default function Home() {
  const promptRef = useRef();
  const [numberOfImages, setNumberOfImages] = useState(1);
  const [renderedImages, setRenderedImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [savedImagesList, setSavedImagesList] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const [clickedImage, setClickedImage] = useState();

  const [uploadetImage, setUploadetImage] = useState(null);
  const [file, setFile] = useState();
  const linkRef = useRef(null)

  const appendPrompt = (word) => {
    promptRef.current.value = promptRef.current.value.concat(", ", word);
  };

  const handleGenerateImage = async () => {
    setLoading(true);
    try {
      const resp = await fetch("/api/openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: promptRef.current.value,
          number: numberOfImages,
        }),
      });
      console.log(promptRef.current.value);
      if (!resp.ok) {
        throw new Error("Unable to generate the image");
      }

      const data = await resp.json();
      console.log(data);

      setRenderedImages(data.data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  function numberLower() {
    if (numberOfImages > 1) {
      setNumberOfImages(numberOfImages - 1);
    }
  }

  function numberHigher() {
    if (numberOfImages < 10) {
      setNumberOfImages(numberOfImages + 1);
    }
  }

  useEffect(() => {
    if (renderedImages.length != 0) {
      if (savedImagesList.length === 0) {
        console.log("jetzt");
        const data = savedImagesList.concat({ url: clickedImage });
        setSavedImagesList(data);
      } else {
        console.log("SAVEDIMAGEList", savedImagesList);
        let isDouble = false;

        savedImagesList.map((imageUrl) => {
          if (imageUrl.url === clickedImage) {
            console.log("Bild schon vorhanden");
            isDouble = true;
          }
        });

        console.log("isDOuble", isDouble);

        if (isDouble === false) {
          console.log("JETZET EINFÜGEN");
          const data = savedImagesList.concat({ url: clickedImage });
          console.log("New List", data);
          setSavedImagesList(data);
        }
      }
    }
  }, [trigger]);

  return (
    <main className="container max-w-4xl mx-auto">
      {/* Input */}
      <section className="flex items-center  gap-2 px-6 py-6">
        <h2>Prompt</h2>
        <input
          type="text"
          className="w-full text-white outline-none py-2 px-6 bg-gray-600 rounded-3xl text-sm"
          placeholder="a woman walking her dog, a ballerina dancing, a dog with glasses, etc"
          defaultValue="a dog play with a ball"
          ref={promptRef}
        />
      </section>

      {/* OptionButtons*/}
      <div className="py-2">
        <h2>Merkmale hinzufügen</h2>

        {OPTIONS.map((option) => {
          return (
            <OptionButtons
              key={option.title}
              title={option.title}
              values={option.values}
              onAppend={appendPrompt}
            />
          );
        })}
      </div>

      <div className="flex flex-col items-center">
        Anzahl der erstellten Bilder:
        <div className="custom-number-input h-10 w-32">
          <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
            <button
              data-action="decrement"
              className=" bg-white text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
              onClick={numberLower}
            >
              <span className="m-auto text-2xl font-thin">−</span>
            </button>
            <input
              type="number"
              className="outline-none focus:outline-none text-center w-full bg-white font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none"
              defaultValue={numberOfImages}
            ></input>
            <button
              data-action="increment"
              className="bg-white text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
              onClick={numberHigher}
            >
              <span className="m-auto text-2xl font-thin">+</span>
            </button>
          </div>
        </div>
      </div>

      {/* Image erstellen */}
      <div className="flex flex-col gap-6 px-6 py-6  items-center">
        <button
          disabled={loading}
          onClick={handleGenerateImage}
          className="hover:opacity-80 py-2 px-6 bg-lime-600 rounded-3xl text-xs uppercase"
        >
          {loading ? "Wird generiert, bitte warten sie ein Moment" : "Bilder generieren"}
        </button>

        <div className="items-center flex flex-wrap space-x-2 space-y-2 "> 
          {renderedImages.length === 0 && (
            <div className="bg-gray-600 aspect-square flex items-center justify-center max-h-[512px] max-w-[512px]">
              Bilder werden hier angezeigt
            </div>
          )}

          {renderedImages.map((image) => {
            if (image.url === clickedImage) {
              return (
                <button
                  onClick={() => {
                    setClickedImage(image.url);
                  }}
                  className=" border-red-600 border-4"
                >
                  <img key={image.url} src={image.url} />
                </button>
              );
            } else {
              return (
                <button
                  onClick={() => {
                    setClickedImage(image.url);
                  }}
                  className="hover:opacity-80"
                >
                  <img key={image.url} src={image.url} />
                </button>
              );
            }
          })}
        </div>

        {/* Images speichern */}
        <button
          onClick={() => {
            setTrigger(!trigger);
          }}
          className="hover:opacity-80 py-2 px-6 bg-lime-600 rounded-3xl text-xs uppercase"
        >
          Image Speichern
        </button>
      </div>

      <h3 className="font-bold mt-4"> Gespeicherte Bilder </h3>
      <div className="flex flex-wrap gap-2 px-6 py-6 ">
        {savedImagesList?.map((image) => {
          return (
            <div className="">
              <img key={image.url} src={image.url} />
            </div>
          );
        })}
      </div>
    
    </main>
  );
}
