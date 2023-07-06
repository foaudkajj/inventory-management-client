import React, { useEffect } from 'react';
import './selling-page.scss';

export default (props: any) => {

    return (
        <React.Fragment>
            <script src="https://kit.fontawesome.com/9f03ccac4b.js" crossOrigin="anonymous"></script>
            <div className='big-row'>
                <div className='row1'>
                    <div className='column1'>
                        <div className='buttons'>
                            <button className='btn1'>burda ne yazıyoor</button>
                            <button className='btn2'><i className="fa fa-save"></i> Kaydet</button>
                            <button className="btn3"><i className="fa fa-close"></i> Çıkış</button>
                        </div>
                        <div className='inputflex'>
                            <input className='input1' ></input>
                            <button className='btn2'><i className="fa-solid fa-store"></i>Ürünler</button>
                        </div>
                        <div className='orders'>
                            <div>
                                <text className='ordertxt1'>Lorem ipsum dolor sit</text>
                                <br />
                                <b><text>Portakal</text></b>
                                <br />
                                <text className='btn3'>123</text>
                                <text className='orderP'>2*portakal <b>2.38  ₺</b> </text>
                                <hr />
                            </div>
                            <div>
                                <text className='ordertxt1'>Lorem ipsum dolor sit</text>
                                <br />
                                <b><text>Portakal</text></b>
                                <br />
                                <text className='btn3'>123</text>
                                <text className='orderP'>2*portakal <b>2.38  ₺</b> </text>
                                <hr />
                            </div>
                            <div>
                                <text className='ordertxt1'>Lorem ipsum dolor sit</text>
                                <br />
                                <b><text>Portakal</text></b>
                                <br />
                                <text className='btn3'>123</text>
                                <text className='orderP'>2*portakal <b>2.38  ₺</b> </text>
                                <hr />
                            </div>
                            <div>
                                <text className='ordertxt1'>Lorem ipsum dolor sit</text>
                                <br />
                                <b><text>Portakal</text></b>
                                <br />
                                <text className='btn3'>123</text>
                                <text className='orderP'>2*portakal <b>2.38  ₺</b> </text>
                                <hr />
                            </div>
                            <div>
                                <text className='ordertxt1'>Lorem ipsum dolor sit</text>
                                <br />
                                <b><text>Portakal</text></b>
                                <br />
                                <text className='btn3'>123</text>
                                <text className='orderP'>2*portakal <b>2.38  ₺</b> </text>
                                <hr />
                            </div>
                        </div>
                    </div>
                    <div className='column2'>
                        <button>ÇOK SATILANLAR</button>
                        <button>BARKODSUZ ÜRÜNLER</button>
                        <button>MEYVE</button>
                        <button>SEBZE</button>
                        <button>KURUYEMİŞ</button>
                        <button>ŞARKÜTERİ</button>
                        <button>BAKLİYAT</button>
                        <button>UNLU MAMÜLER</button>
                        <button>SU</button>
                        <button>YAŞ PASTALAR</button>
                        <button>KURU PASTALAR</button>
                        <button>İÇECEKLER</button>
                        <button>BAKLAVALAR</button>
                        <button>SÜTLÜ TATLILAR</button>
                        <button>DİĞER</button>
                        <button>KURABİYE</button>
                        <button>DONDURMA</button>
                        <button>BÖREKLER</button>
                    </div>
                    <div className='column3'>

                        <div className='containerr'><img src="http://www.canfreshfruits.com.tr/wp-content/uploads/2019/02/armut.jpg" alt="" /><text>armut</text></div>
                        <div className='containerr'><img src="https://static.libertyprim.com/files/familles/figue-large.jpg?1569271764" alt="" /><text>siyah incir</text></div>
                        <div className='containerr'><img src="https://www.bilgiustam.com/resimler/2015/11/elma.jpg" alt="" /><text>elma</text></div>
                        <div className='containerr'><img src="https://st1.myideasoft.com/idea/gs/40/myassets/products/382/ruz1584-18.jpg?revision=1661354364" alt="" /><text>erik</text></div>
                        <div className='containerr'><img src="https://i.cnnturk.com/i/cnnturk/75/0x555/647dff8bae0a8f00bca38fdd.jpg" alt="" /><text>kiraz</text></div>
                        <div className='containerr'><img src="https://static.ticimax.cloud/48857/uploads/urunresimleri/buyuk/1008862-3b-b35.jpg" alt="" /><text>ayva</text></div>
                        <div className='containerr'><img src="https://static.ticimax.cloud/30771/uploads/urunresimleri/buyuk/kavun-kg-6fdd.jpg" alt="" /><text>kavun</text></div>
                        <div className='containerr'><img src="http://www.canfreshfruits.com.tr/wp-content/uploads/2019/02/armut.jpg" alt="" /><text>armut</text></div>
                        <div className='containerr'><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWr34vU9d0kl2OF405eSSz7db53_OTbUzOfo8gXf8SCg&s" alt="" /><text>beyaz incir</text></div>
                        <div className='containerr'><img src="https://ayb.akinoncdn.com/products/2021/06/18/7782/f767a27d-aebc-47f8-9b8a-d0204ab4239d_size780x780_quality60_cropCenter.jpg" alt="" /><text>muz</text></div>
                        <div className='containerr'><img src="https://st1.myideasoft.com/idea/gs/40/myassets/products/382/ruz1584-18.jpg?revision=1661354364" alt="" /><text>erik</text></div>
                        <div className='containerr'><img src="https://ayb.akinoncdn.com/products/2021/08/06/65/4b69be21-98cd-43c3-b680-ad05ed04852f_size780x780_quality60_cropCenter.jpg" alt="" /><text>kayısı</text></div>
                        <div className='containerr'><img src="https://static.ticimax.cloud/48857/uploads/urunresimleri/buyuk/1008862-3b-b35.jpg" alt="" /><text>ayva</text></div>
                        <div className='containerr'><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThtCPaP-RjdZHKKWWkBs8ect3YK7GatUPzVQ&usqp=CAU" alt="" /><text>kivi</text></div>
                        <div className='containerr'><img src="https://reimg-carrefour.mncdn.com/mnresize/600/600/productimage/30092100/30092100_0_MC/8804879761458_1528879608508.jpg" alt="" /><text>portakal</text></div>
                        <div className='containerr'><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWr34vU9d0kl2OF405eSSz7db53_OTbUzOfo8gXf8SCg&s" alt="" /><text>beyaz incir</text></div>
                        <div className='containerr'><img src="https://ayb.akinoncdn.com/products/2021/06/18/7782/f767a27d-aebc-47f8-9b8a-d0204ab4239d_size780x780_quality60_cropCenter.jpg" alt="" /><text>muz</text></div>
                        <div className='containerr'><img src="https://static.ticimax.cloud/37071/uploads/urunresimleri/buyuk/cilek-bursa-9b9f.jpg" alt="" /><text>çilek</text></div>
                        <div className='containerr'><img src="https://static.ticimax.cloud/30771/uploads/urunresimleri/buyuk/kavun-kg-6fdd.jpg" alt="" /><text>kavun</text></div>
                        <div className='containerr'><img src="https://static.ticimax.cloud/48857/uploads/urunresimleri/buyuk/1008862-3b-b35.jpg" alt="" /><text>ayva</text></div>
                        <div className='containerr'><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjVneWFGqKxFvt0UJBSIc292xFopQfSNAzBA&usqp=CAU" alt="" /><text>karpuz</text></div>
                        <div className='containerr'><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSw7uT8MZAke-K2E9BD7CNh4qgcPpvOcCOsJQ&usqp=CAU" alt="" /><text>siyah üzüm</text></div>
                        <div className='containerr'><img src="https://static.libertyprim.com/files/familles/figue-large.jpg?1569271764" alt="" /><text>siyah incir</text></div>
                        <div className='containerr'><img src="https://ayb.akinoncdn.com/products/2021/08/06/65/4b69be21-98cd-43c3-b680-ad05ed04852f_size780x780_quality60_cropCenter.jpg" alt="" /><text>kayısı</text></div>
                        <div className='containerr'><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSw7uT8MZAke-K2E9BD7CNh4qgcPpvOcCOsJQ&usqp=CAU" alt="" /><text>siyah üzüm</text></div>
                    </div>
                </div>
                <div className='row2'>
                    <div className='price'>
                        <div className='stxt'>Lorem ipsum dolor sit</div>
                        <div className='btxt'>32,41 ₺</div>
                    </div>
                    <button className='btn5'><i className="fa-solid fa-money-bill"></i> terciher</button>
                    <button className='btn3'><i className="fa-solid fa-trash"></i> temizle</button>
                    <button className='btn1'><i className="fa-solid fa-arrow-left"></i> son satışı getir</button>
                    <button className='btn1'><i className="fa-regular fa-user"></i> Müşteri Baket</button>
                    <button className='btn1'><i className="fa-solid fa-book"></i> Raporlar</button>
                    <button className='btn2'><i className="fa-solid fa-bars"></i> işlemler</button>
                </div>
            </div>
        </React.Fragment>

    )


}