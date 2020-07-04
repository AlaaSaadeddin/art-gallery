import React, { useState, useEffect } from 'react';
import { Button, Radio, Select, Spin, notification, message } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import Axios from 'axios';
import propTypes from 'prop-types';
import AuthorizationContext from '../../Contexts/AuthorizationContext';
import PictureWall from '../Mockup';
import './style.css';

function PaintingsDetail({ match }) {
  const [imgPreview, setimgPreview] = useState('previewImg');
  const [painting, setPainting] = useState();
  const [size, setSize] = useState();

  const history = useHistory();
  const cloudinaryLink =
    'https://res.cloudinary.com/dacf3uopo/image/upload/v1593353472/';

  const getPaintingByID = async (id) => {
    try {
      const { data } = await Axios.get(`/api/v1/painting/${id}`);
      setPainting(data.data);
    } catch (err) {
      notification.error('حدث خطأ ');
    }
  };
  useEffect(() => {
    getPaintingByID(match.params.artId);
  }, []);

  const handleSizeChange = (value) => {
    setSize(value);
  };

  const addPaintingToCart = async (paintingId) => {
    try {
      const { data } = await Axios.post('/api/v1/cart', {
        paintingId,
      });
      if (data.StatusCode === 201) {
        notification.success('تم إضافة الصورة للسلة بنجاح');
      }
    } catch (data) {
      notification.error('الصورة موجودة فعلاً في السلة');
    }
  };
  return (
    <>
      {painting ? (
        <div className="container">
          <div className="container__details">
            <div className="painting">
              <h1>{painting.title}</h1>
              <p>{painting.description}</p>
              <h3>
                {' '}
                التصنيف <strong>{painting.category}</strong>
              </h3>
              <Link className="artistName" to={`/artist/${painting.artist_id}`}>
                {`ل  ${painting.first_name} ${painting.last_name} `}
              </Link>
              <br />

              <Radio.Group
                className="viewBtn"
                buttonStyle="solid"
                defaultValue="previewImg"
                onChange={(e) => setimgPreview(e.target.value)}
              >
                <Radio.Button className="paintingView" value="previewImg">
                  عرض اللوحة
                </Radio.Button>
                <Radio.Button className="paintingView" value="previewWall">
                  عرض على الحائط
                </Radio.Button>
              </Radio.Group>
              <br />
              <br />
              <label htmlFor="size">
                {' '}
                حجم اللوحة{' '}
                <Select
                  id="size"
                  defaultValue={Object.keys(painting.property)[0]}
                  style={{ width: 120, margin: '10px' }}
                  onChange={handleSizeChange}
                >
                  {Object.keys(painting.property).map((e) => (
                    <Select.Option value={e}>{e}</Select.Option>
                  ))}
                </Select>
                <strong className="price">{painting.property[size]}$ </strong>
                <br />
                <AuthorizationContext.Consumer>
                  {({ user }) => (
                    <Button
                      className="addBtn"
                      onClick={() => {
                        if (user.role === 'customer') {
                          addPaintingToCart(painting.id);
                        } else if (user.role === 'customer' || 'admin') {
                          message.warn(
                            'عليك تسجيل الدخول بحساب مشترٍ لتتم العملية'
                          );
                        } else {
                          history.push('/login');
                        }
                      }}
                    >
                      إضافة إلى السلة
                    </Button>
                  )}
                </AuthorizationContext.Consumer>
              </label>
            </div>
          </div>
          <div className="container__image">
            {imgPreview === 'previewImg' ? (
              <img
                className="imgPreview"
                alt={painting.title}
                src={cloudinaryLink + painting.img}
              />
            ) : (
              <PictureWall paintingSrc={painting.img} />
            )}
          </div>
        </div>
      ) : (
        <Spin />
      )}
    </>
  );
}

PaintingsDetail.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      artId: propTypes.node,
    }).isRequired,
  }).isRequired,
};

export default PaintingsDetail;
