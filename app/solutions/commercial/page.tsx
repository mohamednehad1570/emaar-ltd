import { redirect } from 'next/navigation';

export default function CommercialSolutionsPage() {
  redirect('/solutions?type=commercial');
}
