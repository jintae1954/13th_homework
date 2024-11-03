'use client';

import BoardsPagination from '@/components/boards-list/pagination';
import BoardList from '@/components/boards-list/list';
// import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { FetchBoardsDocument } from '@/commons/graphql/graphql';
import BoardTitleSearch from '@/components/boards-list/search';
import { useBoardStore } from '@/commons/stores/board-store';
import { withLoginCheck } from '@/commons/hocs/with-login-check';

function BoardsPage() {
	const { titleSearch, setTitleSearch, activePage, setActivePage } =
		useBoardStore();
	// const [activePage, setActivePage] = useState(1);
	// const [titleSearch, setTitleSearch] = useState('');
	const { data, refetch } = useQuery(FetchBoardsDocument);

	return (
		<div className="flex w-full max-w-7xl flex-col gap-8">
			<BoardTitleSearch {...{ titleSearch, setTitleSearch, refetch }} />
			<BoardList data={data} activePage={activePage} refetch={refetch} />
			<BoardsPagination
				data={data}
				refetch={refetch}
				activePage={activePage}
				setActivePage={setActivePage}
				titleSearch={titleSearch}
			/>
		</div>
	);
}

export default withLoginCheck(BoardsPage);
