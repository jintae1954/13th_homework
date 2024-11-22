import { gql } from '@apollo/client';

export const CREATE_POINT_TRANSACTIONS_OF_LOADING = gql`
	mutation createPointTransactionOfLoading($paymentId: ID!) {
		createPointTransactionOfLoading(paymentId: $paymentId) {
			_id
			impUid
			amount
			balance
			status
			statusDetail
			user {
				_id
				email
				name
			}
			createdAt
			updatedAt
			deletedAt
		}
	}
`;
