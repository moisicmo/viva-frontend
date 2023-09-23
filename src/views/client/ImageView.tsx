
import { useImageStore } from '@/hooks';
import './styles.css';
import { useRef, useState } from 'react';
import { IconButton } from '@mui/material';
import { Download, Search } from '@mui/icons-material';
import logo from '@/assets/images/viva.png';
import vivaInfinitum from '@/assets/images/viva-infinitum.webp';

export const ImageView = () => {
  const appRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const layerRef = useRef<HTMLDivElement | null>(null);


  const { getImage } = useImageStore();
  const [image, setImage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

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

  const handleSubmited = async (event: any) => {
    event.preventDefault();
    if (inputRef.current!.value) {
      const imageData = await getImage(inputRef.current!.value);
      setImage(imageData);
    }
  }
  const iconButtonStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#d3f074',
    color: 'white',
    fontWeight: 'bold',
    borderRadius: '50%',
    width: '60px',
    height: '60px',
    marginTop: 22.8
  };

  const handleDownload = (event: any) => {
    const link = document.createElement('a');
    link.href = image!;
    link.download = 'tu_imagen.jpg'; // Nombre que tendrá el archivo descargado
    link.click();
  };

  const handleInputChange = (e: any) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (value === '') {
      setImage(null);
    }
  };

  return (
    <>
      <div id="app-cover">
        <div id="app" ref={appRef}>
          <form onSubmit={handleSubmited}>
            <div id="f-element">
              <div id="inp-cover">
                <input
                  type="text"
                  name="query"
                  value={searchQuery}
                  placeholder="Ingresa el código de tu foto"
                  autoComplete="off"
                  ref={inputRef}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="container">
              <div className="container-image">
                {image !== null && (
                  <div className="image-container">
                    <img src={image} alt="Imagen" className="image"/>
                    <IconButton onClick={handleDownload} size="small" className="button-download">
                      <Download fontSize="large"/>
                    </IconButton>
                  </div>
                )}
              </div>
              <IconButton type="submit" style={iconButtonStyle} size='small'>
                <Search fontSize='medium'/>
              </IconButton>
            </div>
          </form>
          <div className='img-container'>
            <img src={vivaInfinitum} id="logo-footer" alt="Logo" />
          </div>
        </div>
        <div id="layer" title="Click the blue area to hide the form" ref={layerRef}></div>
        <div id="init" onClick={toggleApp}></div>
      </div>
      <img src={logo} id="logo-image" alt="Logo" />
    </>
  );
};