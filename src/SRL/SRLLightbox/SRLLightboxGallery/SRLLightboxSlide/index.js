import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import SRLLightboxThubnailGallery from "./SRLLightboxThubnailGallery";
import {
  SRLLightboxContent,
  SRRLLightboxCaption,
  SRLLightboxImageContainer,
  SRLLightboxImage
} from "../styles";

function SRLLightboxSlideComponent({
  source,
  description,
  thumbnailGallery,
  images,
  handleCloseLightbox
}) {
  const SRLImageContainerRef = useRef();

  useOnClickOutside(SRLImageContainerRef, () => handleCloseLightbox());

  return (
    // <SRLLightboxContent
    //   description={description}
    //   thumbnailGallery={thumbnailGallery}>
    //   <SRLLightboxImage className="SRLImage" src={source} alt={description} />
    //   <SRRLLightboxCaption className="SRLCaption">
    //     {description}
    //   </SRRLLightboxCaption>
    //   {thumbnailGallery && <SRLLightboxThubnailGallery images={images} />}
    // </SRLLightboxContent>

    <SRLLightboxContent className="SRLContent">
      <SRLLightboxImageContainer className="SRLImageContainer">
        <SRLLightboxImage
          ref={SRLImageContainerRef}
          className="SRLImage"
          src={source}
          alt={description}
        />
      </SRLLightboxImageContainer>
      <SRRLLightboxCaption className="caption">
        {description}
      </SRRLLightboxCaption>
    </SRLLightboxContent>
  );
  // Hook

  function useOnClickOutside(ref, handler) {
    useEffect(
      () => {
        const listener = event => {
          // Do nothing if clicking ref's element or descendent elements
          if (!ref.current || ref.current.contains(event.target)) {
            return;
          }

          handler(event);
        };

        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);

        return () => {
          document.removeEventListener("mousedown", listener);
          document.removeEventListener("touchstart", listener);
        };
      },
      // Add ref and handler to effect dependencies
      // It's worth noting that because passed in handler is a new ...
      // ... function on every render that will cause this effect ...
      // ... callback/cleanup to run every render. It's not a big deal ...
      // ... but to optimize you can wrap handler in useCallback before ...
      // ... passing it into this hook.
      [ref, handler]
    );
  }
}

SRLLightboxSlideComponent.propTypes = {
  source: PropTypes.string,
  description: PropTypes.string,
  thumbnailGallery: PropTypes.bool,
  images: PropTypes.array,
  handleCloseLightbox: PropTypes.func
};

export default SRLLightboxSlideComponent;
