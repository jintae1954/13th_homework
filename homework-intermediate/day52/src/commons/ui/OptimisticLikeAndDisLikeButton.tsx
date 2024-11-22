'use client'; // 화면과 관련된 Hook을 사용하기 때문에 ClientSide 렌더링이 필요

import { DislikeOutlined, LikeOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from '@apollo/client';
import {
	DISLIKE_BOARD,
	LIKE_BOARD,
} from '../apis/mutations/mutation-likeboard';
import { FETCH_BOARD } from '../apis/queries/fetch-board';

export function OptimisticLikeAndDisLikeButton({ boardId, data }) {
	const [likeBoard] = useMutation(LIKE_BOARD, { variables: { boardId } });
	const [dislikeBoard] = useMutation(DISLIKE_BOARD, { variables: { boardId } });

	const onClickLike = () => {
		console.log('🚀 ~ onClickLike ~ onClickLike 클릭됨');
		likeBoard({
			// variables
			variables: { boardId },
			// 캐싱 데이터를 기반으로 User Interaction을 선제 조치 (optimisticResponse)
			optimisticResponse: {
				likeBoard: (data?.fetchBoard.likeCount ?? 0) + 1,
			},
			// 캐시 데이터를 query 내용으로 update
			update: (cache, { data: likeData }) => {
				console.log('🚀 ~ onClickLike ~ likeData:', likeData);
				cache.writeQuery({
					query: FETCH_BOARD,
					variables: { boardId },
					data: {
						fetchBoard: {
							...data?.fetchBoard,
							_id: boardId,
							__typename: 'Board',
							likeCount: likeData.likeBoard,
						},
					},
				});
			},
		});
	};

	const onClickDisLike = () => {
		dislikeBoard({
			variables: { boardId },
			optimisticResponse: {
				dislikeBoard: (data?.fetchBoard.dislikeCount ?? 0) + 1,
			},
			update: (cache, { data: dislikeData }) => {
				console.log('🚀 ~ onClickDisLike ~ dislikeData:', dislikeData);
				cache.writeQuery({
					query: FETCH_BOARD,
					variables: { boardId },
					data: {
						fetchBoard: {
							...data?.fetchBoard,
							__typename: 'Board',
							_id: boardId,
							dislikeCount: dislikeData.dislikeBoard,
						},
					},
				});
			},
		});
	};

	return (
		<>
			<div className="flex cursor-pointer gap-2" onClick={onClickDisLike}>
				<DislikeOutlined />
				<div className="text-sm font-normal text-gray-400">
					{data?.fetchBoard.dislikeCount ?? 0}
				</div>
			</div>
			<div className="flex cursor-pointer gap-2" onClick={onClickLike}>
				<LikeOutlined />
				<div className="text-sm font-normal text-red-400">
					{data?.fetchBoard.likeCount ?? 0}
				</div>
			</div>
		</>
	);
}
