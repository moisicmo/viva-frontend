
import { useImageStore } from '@/hooks';
import './styles.css';
import { useRef, useState, useEffect } from 'react';

export const ImageView = () => {
    const appRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const layerRef = useRef<HTMLDivElement | null>(null);


    const { getImage } = useImageStore();
    const [image, setImage] = useState<string | null>(null);

    const toggleApp = () => {
        if (appRef.current) {
            appRef.current.classList.toggle('opened');
        }

        if (buttonRef.current) {
            buttonRef.current.classList.toggle('shadow');
        }

        if (appRef.current?.classList.contains('opened')) {
            setTimeout(() => {
                if (inputRef.current) {
                    inputRef.current.classList.toggle('move-up');
                }
            }, 200);

            setTimeout(() => {
                if (inputRef.current) {
                    inputRef.current.focus();
                }
            }, 500);
        } else {
            setTimeout(() => {
                if (inputRef.current) {
                    inputRef.current.classList.toggle('move-up');
                    inputRef.current.value = '';
                }
            }, 200);
        }

        if (layerRef.current) {
            if (!layerRef.current.classList.contains('sl')) {
                setTimeout(() => {
                    layerRef.current?.classList.add('sl');
                }, 800);
            } else {
                setTimeout(() => {
                    layerRef.current?.classList.remove('sl');
                }, 300);
            }
        }
    };

    const handleSubmited = async (event:any) => {
        event.preventDefault();
        if(inputRef.current!.value) {
            const imageData = await getImage(inputRef.current!.value);
            setImage(imageData);
        }
    }

    return (
        <div id="app-cover">
          <div id="app" ref={appRef}>
            <form onSubmit={handleSubmited}>
              <div id="f-element">
                <div id="inp-cover">
                  <input
                    type="text"
                    name="query"
                    placeholder="Ingresa el código de tu foto"
                    autoComplete="off"
                    ref={inputRef}
                  />
                </div>
              </div>
              <div className="container">
                <div className="container-image">
                  {image !== null && (
                    <div className="image-container">
                      <img src={image} alt="Imagen" />
                      <button className="button-download"></button>
                    </div>
                  )}
                </div>
                <button type="submit" className="shadow" ref={buttonRef}>
                  <i className="fas fa-search"></i>
                </button>
              </div>
            </form>
          </div>
          <div id="layer" title="Click the blue area to hide the form" ref={layerRef}></div>
          <div id="init" onClick={toggleApp}></div>
        </div>
      );
};