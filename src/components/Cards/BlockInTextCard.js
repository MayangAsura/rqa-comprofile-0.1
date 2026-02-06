import Typewrite from "../Texts/TypeWrite";
import { StarIcon, EyeIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const availableClass = [
    {title: "Tilawah dan Tadabbur Al Qur'an", slug:'tilawah-dan-tadabbur-al-quran-1256', type: 'Remaja dan Anak-Anak', description: "Jadwal: Selasa, 12.30 wib bersama ustadzah pengampu Ustadzah Reza Hafidzahullah", promoteText: ["Sisa Kuota 16 Thalibah", "Hanya tersedia 3 Kelas untuk program Tahsin", "Kelas Interaktif", "Materi sistematis"]},
    {title: "Tadrib & Ahkam Tajwid", slug:'tadrib-tadabbur-ahkam-tajwid-1257', type: 'Dewasa', description: "Jadwal: Selasa, 12.30 wib bersama ustadzah pengampu Ustadzah Reza Hafidzahullah", promoteText: ["Sisa Kuota 16 Thalibah", "Hanya tersedia 3 Kelas untuk program Tahsin", "Kelas Interaktif", "Materi sistematis"]},
    {title: "Aisar", type: 'Dewasa', slug:'aisar', description: "Jadwal: Selasa, 12.30 wib bersama ustadzah pengampu Ustadzah Reza Hafidzahullah", promoteText: ["Sisa Kuota 16 Thalibah", "Hanya tersedia 3 Kelas untuk program Tahsin", "Kelas Interaktif", "Materi sistematis"]},
    {title: "Daurah/Kajian Ilmu Syar'i", slug: 'daurah-kajian-ilmu-syari', type: 'Dewasa', description: "Jadwal: Selasa, 12.30 wib bersama ustadzah pengampu Ustadzah Reza Hafidzahullah", promoteText: ["Sisa Kuota 16 Thalibah", "Hanya tersedia 3 Kelas untuk program Tahsin", "Kelas Interaktif", "Materi sistematis"]},
    // {title: "T", type: 'Remaja dan Anak-Anak', description: "Jadwal: Selasa, 12.30 wib bersama ustadzah pengampu Ustadzah Reza Hafidzahullah", promoteText: ["Sisa Kuota 16 Thalibah", "Hanya tersedia 3 Kelas untuk program Tahsin", "Kelas Interaktif", "Materi sistematis"]},
  ]

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

const BlockInTextCard = ({ slug, tag, text, runningText, description, type, created_at, price, views, rating }) => {

  const navigate = useNavigate()

  const handleDetail = () => {
  navigate(`/class/${slug}`)
  }

  function getDefaultLocale(currencyCode) {
      const currencyLocaleMap = {
          USD: 'en-US',
          IDR: 'id-ID',
          EUR: 'de-DE',
          JPY: 'ja-JP',
          GBP: 'en-GB',
          CNY: 'zh-CN',
          AUD: 'en-AU'
      };

      return currencyLocaleMap[currencyCode] || 'en-US'; // fallback ke en-US
  }

  function formatCurrency(amount, currencyCode, locale = getDefaultLocale(currencyCode)) {
      return new Intl.NumberFormat(locale, {
          style: 'currency',
          currency: currencyCode,
          maximumFractionDigits: 2
      }).format(amount);
  }
  return (
    <div className="w-full max-w-xl space-y-6">
      
      <div>
        <p className="mb-1.5 text-sm font-light uppercase">{tag}</p>
        <hr className="border-neutral-700" />
      </div>
      <div className="info flex flex-col">
        <p className="flex justify-between items-center text-center text-md my-2">
          <div className="flex items-center">
            {[0, 1, 2, 3, 4].map((rat) => (
              <StarIcon
              key={rat}
              aria-hidden="true"
              className={classNames(
                rating > rat ? 'text-yellow-500' : 'text-gray-300',
                'size-5 shrink-0',
              )}
              />
            ))}
            <p className="text-xs">{rating}/5</p>
            </div>
            <span className="flex type items-center text-center py-1 px-3 ml-1 text-xs border w-[40%] rounded-full bg-green-400 border-gray-600">{type}</span>
          
          </p>

        <div className="flex items-center justify-end">
        </div>
        <div className="mt-5">
          <p className='flex justify-start items-start title text-sm text-gray-500'>Deskripsi</p><span className="flex text-start text-md mb-2">{description}</span>
          <p className='flex title text-sm text-gray-500'>Harga</p><p className="flex text-md">{`${formatCurrency(price, 'IDR')}`}</p>

        </div>
        {/* <p className="max-w-lg text-xl leading-relaxed">{text}</p> */}
        
        {/* <p className=''></p><p className="type text-xs border w-[40%] rounded-full bg-green-400 border-gray-600">{type}</p> */}
      </div>
      <p className="flex justify-end">
            <EyeIcon className="text-center size-5 mr-1"/>
            {views}
          </p>
      <div>
        <Typewrite runningText={runningText} />
        <hr className="border-neutral-300" />
      </div>
      <a type="button" target="_blank" href={`/class/${slug}`} className="w-full rounded-full border border-neutral-950 py-2 text-sm font-medium transition-colors hover:bg-neutral-950 hover:text-neutral-100"
      >
        Daftar Kelas
      </a>
      {/* onClick={handleDetail} */}
    </div>
  );
};
export default BlockInTextCard;
