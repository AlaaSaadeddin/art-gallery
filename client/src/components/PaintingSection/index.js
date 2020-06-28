import React from 'react';
import propTypes from 'prop-types';

function PaintingsSection({ paintings }) {
  const cloudinaryLink =
    'https://res.cloudinary.com/dacf3uopo/image/upload/v1593353472/';
  return (
    <>
      {paintings && (
        <div className="container">
          {paintings.map((painting) => (
            <>
              <div className="flip-card">
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <img
                      alt={painting.title}
                      src={`${cloudinaryLink}${painting.img}`}
                      style={{ width: 300 }}
                    />
                  </div>
                  <div
                    className="flip-card-back"
                    style={{
                      width: 300,
                      background: `linear-gradient(
                        rgba(0, 0, 0,0.7),
                        rgba(0, 0, 0,0.7)
                      ),url(${cloudinaryLink}${painting.img})`,
                    }}
                  >
                    <button type="button"> للمزيد ...</button>
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      )}
    </>
  );
}
PaintingsSection.propTypes = {
  paintings: propTypes.arrayOf(propTypes.object).isRequired,
};
export default PaintingsSection;
