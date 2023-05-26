import { DatePicker, Space } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import './calander.scss';
import dayjs from 'dayjs';
import { bodySlide, fetchDatabase, fetchMoreTodos, fetchTodos } from '../body/bodySlide';
import { useDispatch, useSelector } from 'react-redux';
import { getData, postData } from '../../services';

import { ShowErrorToast, ShowSuccessToast } from '../../hooks/toast/Tost';
import { values } from 'lodash';
const { RangePicker } = DatePicker;
function Calander({ item, setitem, setTogle1, togle1 }) {
  const dispatch = useDispatch();

  const [today, setToday] = useState('');
  const [dates, setDates] = useState([]);
  const [dvates, setDvates] = useState([]);

  const [togle, setTogle] = useState(true);
  const [itemca, setItemca] = useState('');
  useEffect(() => {
    setToday(moment());
  }, []);
  useEffect(() => {
    setItemca(item);
    setTogle(true);
  }, [item]);
  const disabledDate = (current, num) => {
    const currentDate = moment().startOf('day');
    const dateAfter7Days = currentDate.clone().add(num, 'days');

    return current && (current < currentDate || current > dateAfter7Days);
  };
  function handleDate(values) {
    let value = values[1] ?? 0;
    if (value != 0) {
      setDvates(values);
      if (values?.length == 2) {
        let time = values.map((item) => {
          return `${item.$D}-${item.$M < 9 ? 0 : ''}${item.$M + 1}-${item.$y}`;
        });
        setDates(time);
      }
    }else{
    setDates([]);
    }
  }
  function sendDate() {
    if (dates.length > 0) {
      function calculateDays(dateRange) {
        const [startDate, endDate] = dateRange.map((date) => {
          const [day, month, year] = date.split('-');
          return new Date(year, month - 1, day);
        });

        const oneDay = 24 * 60 * 60 * 1000; // Số mili giây trong một ngày
        const diffDays = Math.round(Math.abs((startDate - endDate) / oneDay));

        return diffDays;
      }
      if (localStorage.getItem('token') != 'null') {
        let days = calculateDays(dates);
        const countdownDate = dayjs().add(days, 'day').toDate().getTime();
        dispatch(
          bodySlide.actions.status({
            id: item.id,
            hanmuon: dates[1]
          }),
        );
        let obj = {
          ...item,
          days: countdownDate,
          hanmuon: dates[1],
        };
        dispatch(bodySlide.actions.afterborrow(obj));
        postData('http://localhost:5000/borrow', { obj }, `Beaer ${localStorage.getItem('token')}`).then((data) =>
          setTogle1(''),
        );

        ShowSuccessToast('Mượn thành công !!');
      } else {
        ShowErrorToast('Vui lòng đăng nhập');
      }
      setitem('');
      setTogle(false);
      setDvates('');
      setDates([]);
    } else {
      ShowErrorToast('Chọn ngày mượn và ngày trả ');
    }
  }
  function huysendDate() {
    setTogle(false);
    setDates([]);
    setitem('');
    setDvates('');
  }

  return (
    <>
      <div
        onClick={() => huysendDate()}
        style={itemca != '' && togle == true ? { transform: 'translateY(0)' } : {}}
        className="mangbocchose"
      ></div>
      <div style={itemca != '' && togle == true ? { transform: 'translateY(0)' } : {}} className="chooseDate">
        {itemca != '' ? (
          <>
            <div className="chooseDate__img">
              <img src={itemca.img} alt="" />
            </div>
            <div className="chooseDate__text">Chọn ngày mượn sách</div>
            <Space direction="vertical" size={5}>
              <RangePicker
                placement={'topLeft'}
                disabled={[true, false]}
                onChange={(e) => handleDate(e)}
                disabledDate={(current) => disabledDate(current, itemca.endDate)}
                showTime={false}
              />
            </Space>
          </>
        ) : (
          ''
        )}

        <div style={{ display: 'flex' }}>
          <div onClick={() => sendDate()} className="chooseDate__btn">
            Xác nhận
          </div>
          <div style={{ background: 'rgb(235, 66, 36)' }} onClick={() => huysendDate()} className="chooseDate__btn">
            Hủy
          </div>
        </div>
      </div>
    </>
  );
}
export default Calander;
