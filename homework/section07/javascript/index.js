let 클릭한페이지 = 1;
let 시작페이지 = 1;

const 보여줄갯수 = 4;
const 페이지버튼갯수 = 5;
const 마지막페이지 = Math.ceil(
  JSON.parse(window.localStorage.getItem('민지의일기목록') ?? []).length /
    보여줄갯수
);
console.log('🚀 ~ 마지막페이지:', 마지막페이지);

window.onload = () => {
  console.log('민지의 다이어리에 오신 것을 환영합니다.');

  // 0. 데모 생성..
  JS_데모데이터생성기능(21);

  // 1. 시작하면 일기 목록으로 이동
  JS_메뉴이동('일기');

  // 2. 스크롤 이벤트 걸기
  document.addEventListener('DOMContentLoaded', function () {
    const mainElement = document.getElementById('HTML_일기보관함메인');

    if (mainElement) {
      mainElement.addEventListener('scroll', 스크롤하면실행될녀석);
    } else {
      console.error('HTML_메인 요소가 존재하지 않습니다.');
    }
  });

  // 3. 페이지네이션 기능 추가
  JS_페이지네이션기능();

  // 4. 일기 그리기
  JS_일기그리기기능(시작페이지);
};

const JS_일기그리기기능 = (현재페이지) => {
  // 1. 스토리지에 저장된 일기목록 가져오기
  const 스토리지에저장된일기목록 =
    window.localStorage.getItem('민지의일기목록') ?? '[]';
  const 일기목록 = JSON.parse(스토리지에저장된일기목록);

  // 2. 페이지의 게시글 갯수만큼 filter 후, 일기목록 화면에 그릴 일기장만 태그로 생성
  const HTML_새로운일기도화지 = 일기목록
    .filter((el, idx) => {
      const 건너뛸갯수 = (현재페이지 - 1) * 보여줄갯수;
      return 건너뛸갯수 <= idx && idx < 건너뛸갯수 + 보여줄갯수;
    })
    .map((el, index) => {
      return `
    <a href="./detail.html?number=${index}">
    <div class="CSS_일기">
            <div class="CSS_일기사진">
              ${
                el.기분 === '행복'
                  ? '<img class="CSS_기분이미지" src="./assets/images/joy.png" alt="행복" />'
                  : ''
              }
              ${
                el.기분 === '슬픔'
                  ? '<img class="CSS_기분이미지" src="./assets/images/sadness.png" alt="슬픔" />'
                  : ''
              }
              ${
                el.기분 === '놀람'
                  ? '<img class="CSS_기분이미지" src="./assets/images/surprised.png" alt="놀람" />'
                  : ''
              }
              ${
                el.기분 === '화남'
                  ? '<img class="CSS_기분이미지" src="./assets/images/anger.png" alt="화남" />'
                  : ''
              }
              ${
                el.기분 === '기타'
                  ? '<img class="CSS_기분이미지" src="./assets/images/idontknownothing.png" alt="기타" />'
                  : ''
              }
            </div>
            <div class="CSS_일기정보">
              <div class="CSS_일기내용">
                ${
                  el.기분 === '행복'
                    ? `<div class="CSS_기분 CSS_행복">행복해요</div>`
                    : ''
                }
                ${
                  el.기분 === '슬픔'
                    ? `<div class="CSS_기분 CSS_슬픔">슬퍼요</div>`
                    : ''
                }
                ${
                  el.기분 === '놀람'
                    ? `<div class="CSS_기분 CSS_놀람">놀랐어요</div>`
                    : ''
                }
                ${
                  el.기분 === '화남'
                    ? `<div class="CSS_기분 CSS_화남">화나요</div>`
                    : ''
                }
                ${
                  el.기분 === '기타'
                    ? `<div class="CSS_기분 CSS_기타">기타</div>`
                    : ''
                }
                <div class="CSS_날짜">${el.작성일}</div>
              </div>
              <div class="CSS_일기제목"> ${el.제목}</div>
            </div>
            <img class="CSS_삭제버튼" src="./assets/images/deleteButton.png" onclick="JS_일기삭제기능(event, ${index})" />
          </div>
        </a>
      `;
    })
    .join('');
  window.document.getElementById('HTML_일기보여주는곳').innerHTML =
    HTML_새로운일기도화지;
};

const JS_페이지네이션기능 = () => {
  const initialArr = new Array(페이지버튼갯수).fill(null);
  const 페이지네이션결과 = initialArr
    .map((el, idx) => {
      const 페이지번호 = 시작페이지 + idx;
      return 페이지번호 <= 마지막페이지
        ? `<button
          onclick="JS_일기그리기기능(${페이지번호});클릭한페이지=${페이지번호};JS_페이지네이션기능()"
          class=${클릭한페이지 === 페이지번호 ? 'CSS_클릭한페이지' : ''}
        >
          ${페이지번호}
        </button>`
        : ``;
    })
    .join(' ');
  // console.log('🚀 ~ 페이지네이션결과:', 페이지네이션결과);
  document.getElementById('HTML_페이지보여주는곳').innerHTML = 페이지네이션결과;
};

const JS_다음페이지이동기능 = () => {
  // `시작페이지 + 보여줄갯수`의 의미는 다음페이지 이동을 눌렀을 때 이동할 페이지의 값이다..
  if (시작페이지 + 보여줄갯수 > 마지막페이지) {
    alert('더이상 다음 페이지가 없습니다.');
    return;
  }
  console.log('🚀 ~ 시작페이지:', 시작페이지);
  // 시작페이지가 valid하면 갱신
  시작페이지 = 시작페이지 + 페이지버튼갯수;
  클릭한페이지 = 시작페이지;
  JS_페이지네이션기능();
  JS_일기그리기기능(클릭한페이지);
};

const JS_이전페이지이동기능 = () => {
  if (시작페이지 <= 1) {
    alert('더이상 이전 페이지가 없습니다.');
    return;
  }
  console.log('🚀 ~ 시작페이지:', 시작페이지);
  시작페이지 = 시작페이지 - 페이지버튼갯수;
  클릭한페이지 = 시작페이지;
  JS_페이지네이션기능();
  JS_일기그리기기능(클릭한페이지);
};

const JS_데모데이터생성기능 = (len) => {
  const mockArr = Array.from({ length: len }, (el, i) => ({
    제목: `글${i + 1}`,
    기분: ['행복', '화남', '놀람', '슬픔', '기타'][i % 5], // 다양한 기분을 순환적으로 할당
    작성일: `2024. 9. ${10 + (i % 10)}.`, // 날짜를 순환적으로 할당
    내용: `내용${i + 1}`,
  }));

  window.localStorage.setItem('민지의일기목록', JSON.stringify(mockArr));
};

window.addEventListener('scroll', () => {
  const 화면위에서푸터위까지길이 = document
    .getElementById('HTML_푸터')
    .getBoundingClientRect().top;
  const 보이는화면길이 = window.innerHeight;
  const 보이는화면너비 = window.innerWidth;

  // 1. 푸터가 보일 때는, 화면과 상관없이 사진에 고정시키기
  if (보이는화면길이 >= 화면위에서푸터위까지길이) {
    if (보이는화면너비 >= 849) {
      document.getElementById('HTML_플로팅버튼').style = `
      position: relative;
      bottom: 0;
      left: 97%;
    `;
    } else {
      document.getElementById('HTML_플로팅버튼').style = `
      position: relative;
      bottom: 0;
      left: 90%;
    `;
    }

    // 2. 푸터가 안보일 때는, 사진과 상관없이 화면에 고정시키기
  } else {
    document.getElementById('HTML_플로팅버튼').style = `
      position: fixed;
      bottom: 4rem;
      right: 2rem;
    `;
  }
});

// 스크롤 감지하여 필터 배경색 변경
window.onscroll = function () {
  const selectElement = document.querySelector('.CSS_필터');
  // 1. 스크롤 얼마나 내려갔는지 확인하기
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    // 2. 스크롤이 조금이라도 내려갔으면? 배경색 변경하기
    selectElement.classList.add('CSS_색상반전');
  } else {
    selectElement.classList.remove('CSS_색상반전'); // 스크롤이 맨 위로 올라가면 원래 색으으로 복귀
  }
};

const 스크롤하면실행될녀석 = () => {
  // 1. 스크롤 얼마나 내려갔는지 구하기
  const 스크롤내려간길이 =
    window.document.getElementById('HTML_메인').scrollTop;

  // 2. 스크롤이 조금이라도 내려갔으면? 배경색 변경하기
  if (스크롤내려간길이 === 0) {
    window.document.getElementById('HTML_필터').style =
      'background-color: gray;';
  } else {
    window.document.getElementById('HTML_필터').style =
      'background-color: red;';
  }
};

const JS_글쓰기기능 = () => {
  // 0. 현재 날짜 가져오기

  const date = new Date();

  const options = {
    year: date.getFullYear(),
    month: (date.getMonth() + 1).toString().padStart(2, '0'),
    date: date.getDate().toString().padStart(2, '0'),
  };

  // 1-1. 내가쓴 일기 불러오기
  const 날짜담는통 = options.year + '. ' + options.month + '. ' + options.date;
  const 제목담는통 = window.document.getElementById('HTML_제목입력창').value;
  const 내용담는통 = window.document.getElementById('HTML_내용입력창').value;
  let 기분담는통;
  window.document.getElementsByName('HTML_기분선택버튼').forEach((el) => {
    if (el.checked) 기분담는통 = el.value;
  });

  // 2. 일기목록에 일기 추가하기
  const 일기담는통 = {
    제목: 제목담는통,
    내용: 내용담는통,
    기분: 기분담는통,
    작성일: 날짜담는통,
  };

  const 스토리지에저장된일기목록 =
    window.localStorage.getItem('민지의일기목록') ?? '[]';
  const 일기목록 = JSON.parse(스토리지에저장된일기목록);

  일기목록.push(일기담는통);

  window.localStorage.setItem('민지의일기목록', JSON.stringify(일기목록));

  JS_일기그리기기능();
};

const JS_글보기기능 = (일기번호받는통) => {
  const 일기담는통 = 일기목록[일기번호받는통];
  const 제목담는통 = 일기담는통.제목;
  const 내용담는통 = 일기담는통.내용;

  alert(`
    제목: ${제목담는통}
    내용: ${내용담는통}       
  `);

  location.href = `./detail.html?일기번호=${일기번호받는통}`;
};

const JS_일기필터링기능 = (event) => {
  const 선택한내용 = event.target.value;

  const 스토리지에저장된일기목록 =
    window.localStorage.getItem('민지의일기목록') ?? '[]';
  const 일기목록 = JSON.parse(스토리지에저장된일기목록);
  let 필터링된일기목록;

  switch (선택한내용) {
    case 'HTML_행복선택': {
      필터링된일기목록 = 일기목록.filter((el) => el.기분 === '행복');
      break;
    }
    case 'HTML_슬픔선택': {
      필터링된일기목록 = 일기목록.filter((el) => el.기분 === '슬픔');
      break;
    }
    case 'HTML_놀람선택': {
      필터링된일기목록 = 일기목록.filter((el) => el.기분 === '놀람');
      break;
    }
    case 'HTML_화남선택': {
      필터링된일기목록 = 일기목록.filter((el) => el.기분 === '화남');
      break;
    }
    case 'HTML_기타선택': {
      필터링된일기목록 = 일기목록.filter((el) => el.기분 === '기타');
      break;
    }
    default: {
      필터링된일기목록 = 일기목록;
      break;
    }
  }

  const HTML_새로운일기도화지 = 필터링된일기목록
    .map(
      (el, index) => `
      <a href="./detail.html?number=${index}">
        <div class="CSS_일기">
          <div class="CSS_일기사진">
            ${
              el.기분 === '행복'
                ? '<img class="CSS_기분이미지" src="./assets/images/joy.png" alt="행복" />'
                : ''
            }
            ${
              el.기분 === '슬픔'
                ? '<img class="CSS_기분이미지" src="./assets/images/sadness.png" alt="슬픔" />'
                : ''
            }
            ${
              el.기분 === '놀람'
                ? '<img class="CSS_기분이미지" src="./assets/images/surprised.png" alt="놀람" />'
                : ''
            }
            ${
              el.기분 === '화남'
                ? '<img class="CSS_기분이미지" src="./assets/images/anger.png" alt="화남" />'
                : ''
            }
            ${
              el.기분 === '기타'
                ? '<img class="CSS_기분이미지" src="./assets/images/idontknownothing.png" alt="기타" />'
                : ''
            }
          </div>
          <div class="CSS_일기내용">
            ${
              el.기분 === '행복'
                ? `<div class="CSS_기분 CSS_행복">행복해요</div>`
                : ''
            }
            ${
              el.기분 === '슬픔'
                ? `<div class="CSS_기분 CSS_슬픔">슬퍼요</div>`
                : ''
            }
            ${
              el.기분 === '놀람'
                ? `<div class="CSS_기분 CSS_놀람">놀랐어요</div>`
                : ''
            }
            ${
              el.기분 === '화남'
                ? `<div class="CSS_기분 CSS_화남">화나요</div>`
                : ''
            }
            ${
              el.기분 === '기타'
                ? `<div class="CSS_기분 CSS_기타">기타</div>`
                : ''
            }
            <div class="CSS_날짜">${el.작성일}</div>
          </div>
          <div class="CSS_일기제목"> ${el.제목}</div>
          <img class="CSS_삭제버튼" src="./assets/images/deleteButton.png" onclick="JS_일기삭제기능(event, ${index})" />
        </div>
      </a>
    `
    )
    .join('');
  window.document.getElementById('HTML_일기보여주는곳').innerHTML =
    HTML_새로운일기도화지;
};

const JS_스크롤위로기능 = () => {
  window.scrollTo({
    top: 0,
  });
};

// 일기 삭제 기능
let 현재삭제할일기번호 = null;

const JS_일기삭제기능 = (event, 일기번호) => {
  // 1. 이 버튼 하위에 있는 모든 태그들의 기본기능 막기 => <a /> 태그 이동 막기
  event.preventDefault();
  JS_스크롤위로기능();
  document.body.style.overflow = 'hidden';
  JS_모달열기기능('HTML_일기삭제모달그룹');
  현재삭제할일기번호 = 일기번호;
};

const JS_일기삭제확인기능 = () => {
  const 스토리지에저장된일기목록 =
    window.localStorage.getItem('민지의일기목록') ?? '[]';
  const 일기목록 = JSON.parse(스토리지에저장된일기목록);

  if (현재삭제할일기번호 !== null) {
    // 1. 클릭된 일기번호 삭제하기

    // 2. 삭제된 일기목록 다시 저장하기
    const 삭제후일기목록 = 일기목록.filter(
      (_, index) => index !== 현재삭제할일기번호
    );

    // 2. 삭제된 일기목록 다시 저장하기
    window.localStorage.setItem(
      '민지의일기목록',
      JSON.stringify(삭제후일기목록)
    );

    // 3. 삭제된 일기목록 화면에 다시 그리기
    JS_일기그리기기능();

    // 4. 모달 닫기
    JS_모달닫기기능('HTML_일기삭제모달그룹');

    // 5. 현재삭제할일기번호 초기화
    현재삭제할일기번호 = null;
  }
};

const JS_메뉴이동 = (메뉴) => {
  switch (메뉴) {
    case '일기': {
      window.document.getElementById('HTML_일기보관함메인').style =
        'display: block;';
      window.document.getElementById('HTML_사진보관함메인').style =
        'display: none;';
      window.document.getElementById('HTML_일기보관함필터').style =
        'display: flex';
      window.document.getElementById('HTML_사진보관함필터').style =
        'display: none;';
      window.document.getElementById('HTML_일기보관함탭').style =
        'border-bottom: 0.2rem solid #000;';
      window.document.getElementById('HTML_사진보관함탭').style =
        'color: #ababab;';
      JS_일기그리기기능();
      break;
    }
    case '사진': {
      window.document.getElementById('HTML_일기보관함메인').style =
        'display: none;';
      window.document.getElementById('HTML_사진보관함메인').style =
        'display: block;';
      window.document.getElementById('HTML_일기보관함필터').style =
        'display: none';
      window.document.getElementById('HTML_사진보관함필터').style =
        'display: block;';
      window.document.getElementById('HTML_사진보관함탭').style =
        'border-bottom: 0.2rem solid #000;';
      window.document.getElementById('HTML_일기보관함탭').style =
        'color: #ababab;';
      JS_강아지사진그리기기능();
      break;
    }
  }
};

const JS_사진비율필터링기능 = (event) => {
  const 선택한내용 = event.target.value;
  const 사진목록 = document.querySelectorAll('.CSS_강아지사진');

  사진목록.forEach((사진) => {
    switch (선택한내용) {
      case 'HTML_가로형선택':
        사진.style.aspectRatio = '4 / 3';
        사진.style.maxWidth = '63rem';
        사진.style.width = '100%';
        break;
      case 'HTML_세로형선택':
        사진.style.aspectRatio = '3 / 4';
        사진.style.maxWidth = '48rem';
        사진.style.width = '100%';
        break;
      default:
        사진.style.aspectRatio = '1 / 1';
        사진.style.maxWidth = '63rem';
        사진.style.width = '100%';
        break;
    }
  });
};

const JS_강아지사진그리기기능 = () => {
  // 1. 데이터 받아오기
  fetch('https://dog.ceo/api/breeds/image/random/10').then((받아온결과) => {
    받아온결과.json().then((객체로변경한결과) => {
      const 사진주소 = 객체로변경한결과.message;

      const HTML_기존강아지사진리스트 =
        document.getElementById('HTML_강아지사진보여주는곳').innerHTML;

      // 강아지 사진 데이터 받아오기
      const HTML_받아온강아지사진리스트 = 사진주소
        .map(
          (el, index) => `
        <img class="CSS_강아지사진" src="${el}" alt="강아지사진${index}" />
        `
        )
        .join('');
      // 2. 받아온 데이터 그리기
      document.getElementById('HTML_강아지사진보여주는곳').innerHTML =
        HTML_기존강아지사진리스트 + HTML_받아온강아지사진리스트;
      // 3. 데이터 받기 완료 후 스켈레톤 지우기
      document.getElementById('HTML_스켈레톤').style = 'display: none';
    });
  });
};

let 타이머;
window.addEventListener('scroll', () => {
  const 스크롤퍼센트 =
    document.documentElement.scrollTop /
    (document.documentElement.scrollHeight -
      document.documentElement.clientHeight);
  // console.log('🚀 ~ window.addEventListener ~ 스크롤퍼센트:', 스크롤퍼센트);
  // 기존 타이머가 존재하거나 스크롤퍼센트가 95% 미만인 경우는 무한 스크롤을 적용하지 아니함
  if (타이머 || 스크롤퍼센트 < 0.95) return;

  JS_강아지사진그리기기능();

  // 1초짜리 스로틀링 적용
  타이머 = setTimeout(() => {
    타이머 = null;
    const 마지막스크롤퍼센트 =
      document.documentElement.scrollTop /
      (document.documentElement.scrollHeight -
        document.documentElement.clientHeight);
    if (마지막스크롤퍼센트 === 1) JS_강아지사진그리기기능();
  }, 1000);
});

let 검색용타이머;
const JS_검색기능 = (event) => {
  clearTimeout(검색용타이머);

  검색용타이머 = setTimeout(() => {
    const 내가검색한단어 = event.target.value;
    console.log('🚀 ~ 내가검색한단어:', 내가검색한단어);

    const 스토리지에저장된일기목록 =
      window.localStorage.getItem('민지의일기목록') ?? '[]';

    const 일기목록 = JSON.parse(스토리지에저장된일기목록);
    console.log('🚀 ~ 일기목록:', 일기목록);

    const 검색결과들 = 일기목록.filter((el) =>
      el.기분.includes(내가검색한단어)
    );
    console.log('🚀 ~ 검색결과들:', 검색결과들);

    const HTML_새로운일기도화지 = 검색결과들
      .map(
        (el, index) => `
        <a href="./detail.html?number=${index}">
          <div class="CSS_일기">
            <div class="CSS_일기사진">
              ${
                el.기분 === '행복'
                  ? '<img class="CSS_기분이미지" src="./assets/images/joy.png" alt="행복" />'
                  : ''
              }
              ${
                el.기분 === '슬픔'
                  ? '<img class="CSS_기분이미지" src="./assets/images/sadness.png" alt="슬픔" />'
                  : ''
              }
              ${
                el.기분 === '놀람'
                  ? '<img class="CSS_기분이미지" src="./assets/images/surprised.png" alt="놀람" />'
                  : ''
              }
              ${
                el.기분 === '화남'
                  ? '<img class="CSS_기분이미지" src="./assets/images/anger.png" alt="화남" />'
                  : ''
              }
              ${
                el.기분 === '기타'
                  ? '<img class="CSS_기분이미지" src="./assets/images/idontknownothing.png" alt="기타" />'
                  : ''
              }
            </div>
            <div class="CSS_일기정보">
              <div class="CSS_일기내용">
                ${
                  el.기분 === '행복'
                    ? `<div class="CSS_기분 CSS_행복">행복해요</div>`
                    : ''
                }
                ${
                  el.기분 === '슬픔'
                    ? `<div class="CSS_기분 CSS_슬픔">슬퍼요</div>`
                    : ''
                }
                ${
                  el.기분 === '놀람'
                    ? `<div class="CSS_기분 CSS_놀람">놀랐어요</div>`
                    : ''
                }
                ${
                  el.기분 === '화남'
                    ? `<div class="CSS_기분 CSS_화남">화나요</div>`
                    : ''
                }
                ${
                  el.기분 === '기타'
                    ? `<div class="CSS_기분 CSS_기타">기타</div>`
                    : ''
                }
                <div class="CSS_날짜">${el.작성일}</div>
              </div>
              <div class="CSS_일기제목"> ${el.제목}</div>
            </div>
            <img class="CSS_삭제버튼" src="./assets/images/deleteButton.png" onclick="JS_일기삭제기능(event, ${index})" />
          </div>
        </a>
      `
      )
      .join('');
    window.document.getElementById('HTML_일기보여주는곳').innerHTML =
      HTML_새로운일기도화지;
  }, 1000);
};