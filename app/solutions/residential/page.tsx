import { redirect } from 'next/navigation';

export default function ResidentialSolutionsPage() {
  redirect('/solutions?type=residential');
}
