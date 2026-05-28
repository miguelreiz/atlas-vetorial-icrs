import os

def append_references(filepath, ref_text):
    with open(filepath, 'a', encoding='utf-8') as f:
        f.write(ref_text)
    print(f"Adicionadas referências a {filepath}")

refs_pt = """

## Referências

1. Holzapfel GA, Gasser TC, Ogden RW. A new constitutive framework for arterial wall mechanics and a comparative study of material models. J Elasticity. 2000;61:1-48.
2. Pinsky PM, van der Heide D, Chernyak D. Computational modeling of mechanical anisotropy in the cornea and sclera. J Cataract Refract Surg. 2005;31(1):136-145.
3. Maas SA, Ellis BJ, Ateshian GA, Weiss JA. FEBio: finite elements for biomechanics. J Biomech Eng. 2012;134(1):011005.
"""

refs_en = """

## References

1. Alpins N. A new method of analyzing vectors for changes in astigmatism. J Cataract Refract Surg. 1993;19(4):524-533.
2. Ferrara P, Torquetti L. Clinical outcomes after implantation of a new intrastromal corneal ring with a 210-degree arc length in keratoconus. Cornea. 2009;28(9):989-992.
3. Alió JL, Shabayek MH. Corneal higher order aberrations: a method to grade keratoconus. J Refract Surg. 2006;22(6):539-545.
"""

refs_en_fem = """

## References

1. Holzapfel GA, Gasser TC, Ogden RW. A new constitutive framework for arterial wall mechanics and a comparative study of material models. J Elasticity. 2000;61:1-48.
2. Pinsky PM, van der Heide D, Chernyak D. Computational modeling of mechanical anisotropy in the cornea and sclera. J Cataract Refract Surg. 2005;31(1):136-145.
3. Maas SA, Ellis BJ, Ateshian GA, Weiss JA. FEBio: finite elements for biomechanics. J Biomech Eng. 2012;134(1):011005.
"""

append_references("capitulos_pt/cap10_validacao_fem.md", refs_pt)
append_references("capitulos_en/cap04_three_domains.md", refs_en)
append_references("capitulos_en/cap10_fem_validation.md", refs_en_fem)
