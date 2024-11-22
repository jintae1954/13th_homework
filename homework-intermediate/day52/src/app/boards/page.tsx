'use client';

import BoardsPagination from '@/components/boards-list/pagination';
import BoardList from '@/components/boards-list/list';
import { useQuery } from '@apollo/client';
import { FetchBoardsDocument } from '@/commons/graphql/graphql';
import BoardTitleSearch from '@/components/boards-list/search';
import { useBoardStore } from '@/commons/stores/board-store';

export default function BoardsPage() {
	const { titleSearch, setTitleSearch, activePage, setActivePage } =
		useBoardStore();
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
