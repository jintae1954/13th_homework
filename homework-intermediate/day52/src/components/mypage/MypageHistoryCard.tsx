import { SearchOutlined } from '@ant-design/icons';

export default function MypageHistoryCard(props) {
	return (
		<>
			{/* 상세 내역 */}
			<div className="flex flex-col gap-6">
				{/* 상세 네비게이션 버튼 */}
				<div className="flex items-center gap-4">
					<button className="active-black">나의 상품</button>
					<button>북마크</button>
				</div>
				{/* 상세 내역 검색 */}
				<div className="flex justify-end gap-4">
					<div className="relative w-full max-w-lg">
						<SearchOutlined className="absolute left-3 top-1/2 -translate-y-1/2 transform" />
						<input
							className="h-12 w-full rounded-lg border bg-[#F2F2F2] pl-10 pr-4"
							type="text"
							name="search_myproduct"
							id="search_myproduct"
							placeholder="필요한 내용을 검색하세요."
						/>
					</div>
					<button className="h-12 rounded-lg bg-black px-4 py-2 text-white">
						검색
					</button>
				</div>
				{/* 상세 내역 목록 */}
				<div className="flex w-full flex-col items-center gap-2 rounded-2xl border px-12 py-6">
					{/* 상세 내역 목록 헤더 */}
					<div className="flex h-[52px] w-full max-w-[1184px] gap-2 px-6 py-4">
						<div className="w-[64px] text-center">번호</div>
						<div className="w-[848px]">상품명</div>
						<div className="w-[100px] text-center">판매가격</div>
						<div className="w-[100px] text-center">날짜</div>
					</div>
					{/* 상세 내역 목록 컨텐츠*/}
					<div className="flex h-[548px] w-full max-w-[1184px] flex-col gap-2">
						<div className="flex h-[44px] rounded-lg border px-[24px] py-[12px]">
							<div className="w-[64px] text-center text-[#919191]">번호</div>
							<div className="w-[848px] text-[#1C1C1C]">상품명</div>
							<div className="w-[100px] text-center text-[#333]">판매가격</div>
							<div className="w-[100px] text-center text-[#919191]">날짜</div>
						</div>
					</div>

					{/* 페이지네이션 */}
					<div>123456789</div>
				</div>
			</div>
			;
		</>
	);
}
